$(document).ready(() => {
    $("html").on("click", ".copyToClipOnClickWithAlert", function () {
        const txt = $(this).parent().text();
        copyToClipboard(txt);
        alert("Ins Zwischenverzeichnis kopiert: " + txt);
        return false;
    });

    $("html").on("click", ".copyToClipOnClick", function () {
        const txt = $(this).parent().text();
        copyToClipboard(txt);
        return false;
    });


    $("html").on("mousemove", ".copyLinkToClipOnClick", function(e) {
        window.mouseX = e.pageX;
        window.mouseY = e.pageY;
    });

    $("html").on("click", ".copyLinkToClipOnClick", function() {
        const text = $(this).attr("data-href");
        copyTextToClipboard(text);

        const pos = ($(this).width()/2) - window.mouseX;
        $(this).tooltip({
            title: "copied",
            animation: true,
            placement: "bottom",
            offset: `${-pos}px`,
            trigger: "manual"
        });

        $(this).tooltip("show");

        setTimeout(() => {
            $(this).tooltip("dispose");
        }, 1500);
    });
});


function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}

function copyTextToClipboard(txt) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(txt).select();
    document.execCommand("copy");
    $temp.remove();
}
