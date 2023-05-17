const API_URL = 'http://localhost:5000/api';

// $.get(`${API_URL}/light_devices`)
// .then(response => {
//   response.forEach(device => {
//     $('#devices tbody').append(`
//       <tr>
//         <td>${device.user}</td>
//         <td>${device.name}</td>
//         <td>${device.name}</td>
//       </tr>`
//     );
//   });
// })
// .catch(error => {
//   console.error(`Error: ${error}`);
// });


$('#add-light-device').on('click', () => {
  const user = $('#user').val();
  const status = $('#status').val();
  const colorpicker = $('#colorpicker').val();
  const type = "light";

  const body = {
    user,
    status,
    colorpicker,
    type
  };

  $.post(`${API_URL}/light_devices`, body)
    .then(response => {
      location.reload();
      alert(`Device added successfully: ${body}`)
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    });
});

$('#edit-light-device').on('click', () => {
  const user = $('#user').val();
  const status = $('#status').val();
  const colorpicker = $('#colorpicker').val();
  const type = "light";

  const body = {
    user,
    status,
    colorpicker,
    type
  };

  console.log(body.user);

  $.ajax({
    url: `${API_URL}/light_devices`,  // Update the URL to match your PUT endpoint
    type: 'PUT',
    data: body,
    dataType: 'json',  // Specify the expected response data type
    success: response => {
      alert(`Device edited successfully: ${JSON.stringify(body)}`);
      location.reload();
    },
    error: (error) => {
      console.error(`Error: ${error}`);
    }
  });
});


$('#add-ac-device').on('click', (event) => {
  const user = $('#user').val();
  const status = $('#status').val();
  const temperature = $('#temperature').val();
  const type = "air-conditioning";

  const body = {
    user,
    status,
    temperature,
    type
  };
  console.log(body);

  $.post(`${API_URL}/air_conditioning_devices`, body)
    .then(response => {
      location.reload();
      alert(`Device added successfully: ${body}`)
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    });
});

$('#edit-ac-device').on('click', () => {
  const user = $('#user').val();
  const status = $('#status').val();
  const temperature = $('#temperature').val();
  const type = "air-conditioning";

  const body = {
    user,
    status,
    temperature,
    type
  };

  console.log(body.user);

  $.ajax({
    url: `${API_URL}/air_conditioning_devices`,  // Update the URL to match your PUT endpoint
    type: 'PUT',
    data: body,
    dataType: 'json',  // Specify the expected response data type
    success: response => {
      alert(`Device edited successfully: ${JSON.stringify(body)}`);
      location.reload();
    },
    error: (error) => {
      console.error(`Error: ${error}`);
    }
  });
});

$('#add-security-device').on('click', () => {
  const user = $('#user').val();
  const status = $('#status').val();
  const type = "security";

  const body = {
    user,
    status,
    type
  };

  $.post(`${API_URL}/security_devices`, body)
    .then(response => {
      location.reload();
      alert(`Device added successfully: ${body}`)
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    });
});

$('#edit-security-device').on('click', () => {
  const user = $('user').val();
  const status = $('#status').val();
  const type = "security";

  const body = {
    user,
    status,
    type
  };

  console.log(body.user);

  $.ajax({
    url: `${API_URL}/security_devices`,  // Update the URL to match your PUT endpoint
    type: 'PUT',
    data: body,
    dataType: 'json',  // Specify the expected response data type
    success: response => {
      alert(`Device edited successfully: ${JSON.stringify(body)}`);
      location.reload();
    },
    error: (error) => {
      console.error(`Error: ${error}`);
    }
  });
});

$('#remove-device').on('click', () => {
  const user = $('#user').val();
  const type = $('#type').val();

  const body = {
    user
  };

  console.log(body.user);
  let url = '';
  
  if (type === 'light') {
    url = `${API_URL}/light_devices`;
  } else if (type === 'air-conditioning') {
    url = `${API_URL}/air_conditioning_devices`;
  } else if (type === 'security') {
    url = `${API_URL}/security_devices`;
  }
   

  // AJAX request to delete the selected device
  $.ajax({
    url: url,
    type: 'DELETE',
    data: body,
    success: function (response) {
      console.log('Device deleted:', response);
      // Handle success response here
    },
    error: function (xhr, status, error) {
      console.error('Error deleting device:', error);
      // Handle error response here
    }
  });
});
