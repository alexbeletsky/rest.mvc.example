using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Models;

namespace Web.API.v1.Controllers
{
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

    }
}
