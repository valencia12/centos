$("#loginF").submit(function(e) {
    e.preventDefault();//prevent the form from actually submitting
    window.location = '/expedientes';
});