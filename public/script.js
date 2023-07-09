function handleFormSubmit(event) 
{
  event.preventDefault();
  const fullName = document.getElementById('fullName').value;
  const address = document.getElementById('address').value;
  const email = document.getElementById('email').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  // Create form data object
  const formData = 
  {
    fullName: fullName,
    address: address,
    email: email,
    phoneNumber: phoneNumber
  };
  // Send form data to the server
  fetch('/submit', 
  {
    method: 'POST',
    headers: 
    {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => 
      {
      if (response.ok) 
      {
        alert('Form submission successful!');
        document.getElementById('contactForm').reset(); // Clear form fields
      } 
      else 
      {
        alert('Error submitting form.');
      }
    })
    .catch(error => 
    {
      console.error('Error:', error);
    });
}

// Function to fetch data from the server and populate the table
function fetchData() 
{
  fetch('/data')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#dataTable tbody');
      tableBody.innerHTML = '';

      data.forEach(row => 
        {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
          <td>${row.full_name}</td>
          <td>${row.address}</td>
          <td>${row.email}</td>
          <td>${row.phone_number}</td>
        `;
        tableBody.appendChild(tableRow);
      });
    })
    .catch(error => 
      {
      console.error('Error:', error);
    });
}

// Function to show/hide the table and fetch data only when showing the table
function toggleTable() 
{
  const tableContainer = document.getElementById('tableContainer');
  const showTableButton = document.getElementById('showTableButton');

  if (tableContainer.style.display === 'none') 
  {
    tableContainer.style.display = 'block';
    showTableButton.textContent = 'Hide Table';
    fetchData(); 
  } 
  else 
  {
    tableContainer.style.display = 'none';
    showTableButton.textContent = 'Show Table';
  }
}
function clearForm()
{
  document.getElementById("contactForm").reset();
}

const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', handleFormSubmit);

const showTableButton = document.getElementById('showTableButton');
showTableButton.addEventListener('click', toggleTable);


//hide the table at first
(function() 
{
  const tableContainer = document.getElementById('tableContainer');
  tableContainer.style.display = 'none';
})();


