for (let i = 2; i < 100; i++) {
  let isSimple = true;
  for (let j = 2; j < i; j++){
    if (i % j === 0) {
      isSimple = false;
    }

  }
  if (isSimple === true) {
    document.write('<p>' + i + ' - делитель 0 и ' + i + '</p>' );
  }
}