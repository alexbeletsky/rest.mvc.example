using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Models;
using Web.API.v1.Models;
using Web.Infrastructure;

namespace Web.API.v1.Controllers
{
    [HandleJsonError]
    public class ApiV1Controller : Controller
    {
        private RestExampleDataContext _context = new RestExampleDataContext();

        [HttpGet]
        public JsonResult All(string userName)
        {
            var posts = _context.BlogPosts.Where(p => p.CreatedBy == userName);

            return Json(
                new { success = true, data = new { posts = posts.ToList() } }, JsonRequestBehavior.AllowGet
            );
        }

        [HttpPost]
        public JsonResult Post(string userName, PostDescriptorModel post)
        {
            var blogPost = new BlogPost {
                CreatedBy = userName,
                CreatedDate = DateTime.Now,
                Title = post.Title,
                Body = post.Body,
                Url = CreatePostUrl(post.Title) 
            };

            _context.BlogPosts.InsertOnSubmit(blogPost);
            _context.SubmitChanges();

            return Json(
                new { success = true, url = blogPost.Url });
        }

        [HttpGet]
        public JsonResult Get(string userName, string postUrl)
        {
            var blogPost = _context.BlogPosts.Where(p => p.CreatedBy == userName && p.Url == postUrl).SingleOrDefault();

            return Json(
                new { success = true, data = blogPost }, JsonRequestBehavior.AllowGet);
        }

        [HttpDelete]
        public JsonResult Delete(string userName, string postUrl)
        {
            var blogPost = _context.BlogPosts.Where(p => p.CreatedBy == userName && p.Url == postUrl).SingleOrDefault();

            _context.BlogPosts.DeleteOnSubmit(blogPost);
            _context.SubmitChanges();

            return Json(
                new { success = true, data = (string)null });
        }

        [HttpGet]
        public JsonResult Fail()
        {
            throw new NotImplementedException();
        }

        private string CreatePostUrl(string title)
        {
            var titleWithoutPunctuation = new string(title.Where(c => !char.IsPunctuation(c)).ToArray());
            return titleWithoutPunctuation.ToLower().Trim().Replace(" ", "-");
        }
    }
}
