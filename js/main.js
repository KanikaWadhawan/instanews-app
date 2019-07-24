

$('#select-menu').on('change', function() {
    const selected = $(this).val();
    if (selected !== '') {
      console.log('The value you picked is: ' + selected);
    }
  });
