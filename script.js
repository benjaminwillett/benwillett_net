(function () {
    // Mobile navigation
    var toggle = document.querySelector(".menu-toggle");
    var nav = document.getElementById("site-nav");
    if (toggle && nav) {
        var setOpen = function (open) {
            toggle.setAttribute("aria-expanded", String(open));
            toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
            nav.classList.toggle("is-open", open);
        };
        toggle.addEventListener("click", function () {
            setOpen(toggle.getAttribute("aria-expanded") !== "true");
        });
        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () { setOpen(false); });
        });
    }

    // Contact form: the site is static, so the form opens the visitor's email app
    var form = document.getElementById("contact-form");
    var note = document.getElementById("contact-form-note");
    if (form && note) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            var fields = new FormData(form);
            var value = function (name) { return String(fields.get(name) || "").trim(); };
            var subject = "Message from " + (value("name") || "benwillett.net");
            var body = [
                value("message") || "",
                "",
                "Name: " + (value("name") || "Not provided"),
                "Email: " + (value("email") || "Not provided"),
                ""
            ].join("\n");
            window.location.href = "mailto:benw@techcamp.com.au?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(body);
            note.textContent = "Opening your email app with the message filled in.";
        });
    }
})();
