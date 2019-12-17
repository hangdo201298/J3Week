using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using System.Diagnostics;
using DemoInsta.Entities;
using Newtonsoft.Json;

namespace DemoInsta.Views
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class LoginPage : ContentPage
	{
		public LoginPage ()
		{
			InitializeComponent ();
            
        }

        private async void BtnLogin_Clicked(object sender, EventArgs e)
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri("http://10.0.2.2");


            Debug.WriteLine("Tạo object data");
            
            var data = new InfoLogin()
            {
                Email = "eri@email",
                Passwords = "123"
                // Tắt đi thì không cần login
                //Email = username.Text,
                //Passwords = password.Text,

            };
            Debug.WriteLine("Chuyển json data");
            string jsonMessage = JsonConvert.SerializeObject(data);
            //string jsonData = @"{""Email"" : ""eri@email"", ""Passwords"" : ""123""}";

            var content = new StringContent(jsonMessage, Encoding.UTF8, "application/json");
            //HttpResponseMessage response = await client.PostAsync("/foo/login", content);

            HttpResponseMessage response = await client.PostAsync("/login", content);
            
            string result = await response.Content.ReadAsStringAsync();

            Debug.WriteLine("Kết quả");
            Debug.WriteLine(result);


            Debug.WriteLine("Chuyển object");
            ResponseLogin responselogin = JsonConvert.DeserializeObject<ResponseLogin>(result);

            Debug.WriteLine("Gọi if");
            if (responselogin.code ==1) {
                Debug.WriteLine("Đúng");
                await Navigation.PushModalAsync(new MainPage());
            }
            else
            {
                await DisplayAlert("Thông báo", "Tài khoản hoặc mật khẩu không đúng", "OK");
            }
            

        }
    }
}