
// replace this with your study information
var finish_url_base = "https://unsw-psy.sona-systems.com/webstudy_credit.aspx?experiment_id=...&survey_code=";

var subj_id = jsPsych.data.getURLVariable("id");

if (subj_id) {
    var redirect_url = finish_url_base + subj_id;
}
else {
    var redirect_url = "https://unsw-psy.sona-systems.com";
}

var consent = {
    type: "external-html",
    url: "consent.html",
    cont_btn: "consented",
    check_fn: function () {
        jsPsych.data.addProperties(
            {
                subj_id: subj_id,
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
