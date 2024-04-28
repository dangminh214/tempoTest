//import destinationModel from './models/destinationModel'
async function submitForm() {
  const nameInput = document.querySelector('.inputNewTourName');
  const name = nameInput ? nameInput.value : '';
  console.log(nameInput);

  const descriptionInput = document.querySelector('.inputNewTourDescription');
  const description = descriptionInput ? descriptionInput.value : '';

  const destinationInput = document.querySelector('.inputNewTourDestination');
  const destinationName = destinationInput ? destinationInput.value : '';

  console.log("totest: ", name, description, destinationName)

  //const destination = await destinationModel.find(Number(destinationId));

  /* const response = await fetch(`/destination/${destinationId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch destination');
  }
  const selectedDestination = await response.json();
  console.log('Selected destination:', selectedDestination); */
  const tourData = { name, description, destination: destinationName}
  const createTourResponse = fetch('/tours/newTour', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tourData),
  })
  .then(response => {
    if (response.ok) {
      console.log('Tour created successfully');
      // Optionally, redirect the user to another page after creating the tour
      window.location.href = '/tours';
    } else {
      console.error('Failed to create tour');
    }
  })
  .catch(error => console.error('Error submitting form:', error));
}