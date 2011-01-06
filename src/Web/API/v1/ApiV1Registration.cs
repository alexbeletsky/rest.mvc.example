using System.Web.Mvc;

namespace Web.API.v1
{
    public class ApiV1Registration : AreaRegistration
    {
        public override string AreaName
        {
            get { return "ApiV1"; }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "ApiV1_posts",
                "api/v1/posts/{action}/{userName}/{postUrl}",
                new { controller = "ApiV1", postUrl = UrlParameter.Optional });
        }
    }
}