using DemoInsta.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace DemoInsta.Components
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class MenuComponent : StackLayout
    {
        public MenuComponent()
        {
            InitializeComponent();
        }
        private void Profile(object sender, System.EventArgs e)
        {
            Navigation.PushModalAsync(new Profile());
        }
    }
}