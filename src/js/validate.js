function validate(val) {
  v1 = document.getElementById('fname');
  v2 = document.getElementById('lname');

  if (val >= 1 || val == 0) {
    if (v1.value == '') {
      v1.style.borderColor = 'red';
      flag1 = false;
    } else {
      v1.style.borderColor = 'green';
      flag1 = true;
    }
  }

  if (val >= 2 || val == 0) {
    if (v2.value == '') {
      v2.style.borderColor = 'red';
      flag2 = false;
    } else {
      v2.style.borderColor = 'green';
      flag2 = true;
    }
  }
}

function onSubmit(event) {
  event.preventDefault();
  v1 = document.getElementById('fname');
  v2 = document.getElementById('lname');
  let btn = document.getElementById('btn-block');

  flag1 = true;
  flag2 = true;
  if (v1.value == '') {
    v1.style.borderColor = 'red';
    flag1 = false;
  } else {
    v1.style.borderColor = 'green';
    flag1 = true;
  }

  if (v2.value == '') {
    v2.style.borderColor = 'red';
    flag2 = false;
  } else {
    v2.style.borderColor = 'green';
    flag2 = true;
  }

  if (flag1 && flag2) {
    const studentPosition = localStorage.getItem('studentPosition');
    btn.textContent = '...';
    btn.disabled = true;

    const currentURL = window.location.href;

    // Get the root folder
    const rootFolder = currentURL.substring(0, currentURL.lastIndexOf('/'));

    fetch(rootFolder + '/mail.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: v2.value + ' ' + v1.value,
        studentPosition: studentPosition || 'Student refused to play the game',
      }),
    })
      .then((response) => response.text())
      .then((html) => {
        document.documentElement.innerHTML = html;
      })
      .catch((error) => {
        btn.textContent = 'Submit';

        console.error('Fetch error:', error);
      });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.btn-primary').addEventListener('click', onSubmit);
});
