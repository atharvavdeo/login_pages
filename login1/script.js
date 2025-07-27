const loginForm = document.querySelector('.login-form');
        const registerForm = document.querySelector('.register-form');
        const wrapper = document.querySelector('.wrapper');
        const loginTitle = document.querySelector('.title-login');
        const registerTitle = document.querySelector('.title-register');

        function loginFunction() {
            loginForm.classList.add("active");
            registerForm.classList.remove("active");

            loginForm.style.left = "50%";
            loginForm.style.opacity = "1";
            loginForm.style.transform = "translateX(-50%)";
            loginForm.style.zIndex = "2";

            registerForm.style.left = "150%";
            registerForm.style.opacity = "0";
            registerForm.style.transform = "translateX(150%)";
            registerForm.style.zIndex = "1";

            wrapper.style.minHeight = "520px";

            loginTitle.style.opacity = "1";
            loginTitle.style.transform = "translate(-50%, -50%)";

            registerTitle.style.opacity = "0";
            registerTitle.style.transform = "translate(-50%, -150%)";
        }

        function registerFunction() {
            registerForm.classList.add("active");
            loginForm.classList.remove("active");

            loginForm.style.left = "-50%";
            loginForm.style.opacity = "0";
            loginForm.style.transform = "translateX(-150%)";
            loginForm.style.zIndex = "1";

            registerForm.style.left = "50%";
            registerForm.style.opacity = "1";
            registerForm.style.transform = "translateX(-50%)";
            registerForm.style.zIndex = "2";

            wrapper.style.minHeight = "650px";

            loginTitle.style.opacity = "0";
            loginTitle.style.transform = "translate(-50%, -150%)";

            registerTitle.style.opacity = "1";
            registerTitle.style.transform = "translate(-50%, -50%)";
        }


        

        // Initialize with login form visible
        window.addEventListener('load', function() {
            loginFunction();
            loginForm.classList.add("active");
        });