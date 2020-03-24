
var consent = {
    type: "external-html",
    url: "consent.html",
    cont_btn: "consented",
    check_fn: function () {
        jsPsych.data.addProperties(
            {
                sona_id: jsPsych.data.getURLVariable("id"),
                wants_copy: document.getElementById("copy").checked,
            }
        );
        return true;
    }
};

var debrief = {
    type: "external-html",
    url: "debrief.html",
    cont_btn: "been_debriefed",
};

jatos.onLoad(
    function () {

        var finish_url_base = jatos.studyJsonInput.finish_url_base;

        var sona_id = jatos.urlQueryParameters.id;

        if (sona_id) {
            var redirect_url = finish_url_base + sona_id;
        }
        else {
            var redirect_url = "https://unsw-psy.sona-systems.com";
        }

        jsPsych.init(
            {
                timeline: [
                    consent,
                    debrief,
                ],
                on_finish: function() {

                    var results = jsPsych.data.get().json();

                    jatos.submitResultData(results)
                        .done(jatos.endStudyAjax)
                        .done(
                            () => {
                                window.location.href = redirect_url;
                            }
                        );
                },
            }
        );
    }
);
