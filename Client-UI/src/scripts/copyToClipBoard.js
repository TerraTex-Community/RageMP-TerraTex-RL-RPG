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
        alert("Ins Zwischenverzeichnis kopiert: " + txt);
        return false;
    });

    function copyToClipboard(element) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).text()).select();
        document.execCommand("copy");
        $temp.remove();
    }
});
