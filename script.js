(function () {
    const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;
  
    //I'm adding this section so I don't have to keep updating this pen every year :-)
    //remove this if you don't need it
    let today = new Date(),
        dd = String(today.getDate()).padStart(2, "0"),
        mm = String(today.getMonth() + 1).padStart(2, "0"),
        yyyy = today.getFullYear(),
        nextYear = yyyy,
        dayMonth = "11/30/",
        birthday = dayMonth + yyyy;
    
    today = mm + "/" + dd + "/" + yyyy;
    if (today > birthday) {
      birthday = dayMonth + nextYear;
    }
    //end
    
    const countDown = new Date(birthday).getTime(),
        x = setInterval(function() {    
  
          const now = new Date().getTime(),
                distance = countDown - now;
  
          document.getElementById("days").innerText = Math.floor(distance / (day)),
            document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
            document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
            document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);
  
          //do something later when date is reached
          if (distance < 0) {
            document.getElementById("headline").innerText = "It's my birthday!";
            document.getElementById("countdown").style.display = "none";
            document.getElementById("content").style.display = "block";
            clearInterval(x);
          }
          //seconds
        }, 0)
    }());


    var close = document.querySelector("#close")
    var form = document.querySelector("#form")
    var payNow = document.querySelector("#payNow")

    close.addEventListener("click", ()=>{
        form.classList.toggle("hidden")
    })

    payNow.addEventListener("click", ()=>{
        form.classList.toggle("hidden")
    })

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    // Get email and reference from the URL
    var email = getParameterByName('email');
    var reference = getParameterByName('reference');

    email && reference && payWithPaystack(email, reference)

function payWithPaystack(mail, ref) {

  var handler = PaystackPop.setup({

    key: 'pk_test_03a7b764afcb17e8aa5804299398ac4a846dfd80', // Replace with your public key

    email: mail,

    amount: 27000 * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit

    currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars

    ref: ref, // Replace with a reference you generated

    callback: function(response) {
      var reference = response.reference;

      const  markAsPaid = async() => {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
            }
        };

        xhr.open("GET", "payment.php?ref=" + reference, true);
        xhr.send();
      }
      markAsPaid().then(e => alert('Payment complete! Reference: ' + reference))
      

       waitForAlertClose(function() {
            location.replace("./index.html")
        });
        function waitForAlertClose(callback) {
            var interval = setInterval(function() {
                if (!document.body.contains(document.querySelector('.modal'))) {
                    clearInterval(interval);
                    callback();
                }
            }, 100);
        }
    },

    onClose: function() {

        alert('Transaction was not completed, window closed.');
        waitForAlertClose(function() {
            location.replace("./index.html")
        });
        function waitForAlertClose(callback) {
            var interval = setInterval(function() {
                if (!document.body.contains(document.querySelector('.modal'))) {
                    clearInterval(interval);
                    callback();
                }
            }, 100);
        }

    },

  });

  handler.openIframe();

}



var menu = document.querySelector("#menu")
var menu_bars = document.querySelector("#menu_bars")
var menu_cancel = document.querySelector("#menu_cancel")
var menu_content = document.querySelector("#menu_content")

window.innerWidth < 800 && menu_content.classList.add("hidden")

window.addEventListener("resize", ()=>{
    if(window.innerWidth < 800){
        menu_bars.classList.remove("hidden")
        menu_cancel.classList.add("hidden")
        menu_content.classList.add("hidden")
    }else{
        menu_bars.classList.add("hidden")
        menu_cancel.classList.remove("hidden")
        menu_content.classList.remove("hidden")
    }
})

menu.addEventListener("click", ()=>{
    menu_bars.classList.toggle("hidden")
    menu_cancel.classList.toggle("hidden")
    menu_content.classList.toggle("hidden")
})