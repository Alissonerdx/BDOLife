using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using BDOLife.Application.Interfaces;
using BDOLife.Web.Util;
using Microsoft.AspNetCore.Mvc;

namespace BDOLife.Web.Controllers
{
    public class RankingController : Controller
    {

        private readonly IRankingService _rankingService;

        public RankingController(IRankingService rankingService)
        {
            _rankingService = rankingService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Processar(int maestriaId)
        {
            //using (var client = new HttpClient())
            //{
            //    //client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            //    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            //    client.DefaultRequestHeaders.TryAddWithoutValidation("Cookie", "_ga=GA1.2.658849959.1599450495; _fbp=fb.1.1599450494869.389979260; red_locale=pt; _gid=GA1.2.1940971744.1605656490; rfuid=5e9c01ff9378c0e7b198cbc2dbf54ebb; __RequestVerificationToken=qnI7N-7lhnm16HEQ8P3fL7WNKSxJPSE2BBj_r1JneIJKHlFaoAk-k-TTOUioDMikXcmGF6llvbchWzEgE6LR2a4SdkLAylTNIpiNXNi36TA1; ASP.NET_SessionId=myli5grlupig2nfz4pp0uid1; _redfox-web_session=WTNMOWxaY1RxTmNuT0xQVzJCempDR3IvUTVHZG1wOWhRUklESjd2Nm1sNll4ME1pQ3REazlpZURaSDY5STJ3OG1hck9BMUVUZlRRNjB6cE1sR0RoN2FDbm4vVXV6RDFZL1orclJIVHE1aVl2SFJERkI4OTNEaFRrcXB5eVd5QkxtN2NFQjVxc3N6WEhzMGV2M2tTMk1jU0FDVE9lcVhIVGxtdU1PaFZqcEdmSFd6YS9SY09WRldodHQzOGFpVmFtcFYzbkNtRkNuWUhnSkNPZHhTbnRYR29WRy9iMEVVenVYbDF1Tmx5U3NKcjVNTjJnYUJkUmVmUHhKdXdNWlhoQ0hUUEQra2JocW81RlRDSjVJbEVrb1NBWVFOQ080ZXMvamdHK1B3d04za0JnM1pGaDdDbnZpQWIxU292NDdTZFpRSWphZ0tnNEFuOXNidzBUaVAzMytWbXFqdnU3MVJKejlndURKbkZwaEVXZ2VSSFBCN1Z0WWh3L2pGeUFwSGhvdUU2eGZHYksvQlVFZEJzdmJGaTBnT2sySFNiM0ovK1lqWVNVYzUwTWtraVo4YUFkN2NGcWl0UzJBOEdpb21rNi0tN2E4QUx5cXk5c1d3ME9iSXhKY3cydz09--9f4fce3e691b46ada702d22a16635259bd377836; _gat=1");
            //    client.DefaultRequestHeaders.TryAddWithoutValidation("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36 Edg/86.0.622.69");



            //    string url = "https://blackdesert-tradeweb.playredfox.com/Home/GetWorldMarketList"; // Just a sample url

            //    HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, url);
            //    request.Content = new StringContent("__RequestVerificationToken=O_YOdDOLvJ16cZqtCEqcDafsjVwO-SSeSPzhYmr_Ok2smxZjIqA__1npcOi2V6u40_GhDWn1uoAxnAKyG0nQ_KH-bB2lmXZzC56OZZgEOWo1&mainCategory=35&subCategory=4",
            //                                        Encoding.UTF8,
            //                                        "application/x-www-form-urlencoded");//CONTENT-TYPE header

            //    var response = await client.PostAsync(request.RequestUri, request.Content);
            //    var content = await response.Content.ReadAsStringAsync();
            //}



            var lista = await _rankingService.Processar(maestriaId);

            foreach (var receita in lista)
            {
                receita.SubItensInline = await this.RenderViewToStringAsync("_ReceitaInlinePartial", receita.ItensQuantidadesNecessarias);
                receita.ItensQuantidadesNecessarias = null;
            }

            return Json(new { data = lista });
        }
    }
}
