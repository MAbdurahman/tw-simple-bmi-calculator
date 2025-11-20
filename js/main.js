/*-----Javascript for js-create-design-website */
$(window).on('load', function () {
   // makes sure that whole site is loaded
   console.log('and the Window has loaded,');

   $('.col-3 input').val('');

   $('.effect-07').focusout(function () {
      if ($(this).val() !== '') {
         $(this).addClass('has-content');
      } else {
         $(this).removeClass('has-content');
      }
   });
});

$(document).ready(function () {
   console.log('document is ready in jQuery!');
   $('#preloader-gif, #preloader').fadeOut(5000, function () {});
});

document.addEventListener('DOMContentLoaded', () => {
   console.log('document is ready in plain JavaScript!');

   const form = document.getElementById('main-form');
   const imperial_measurement = document.getElementById('imperial');
   const metric_measurement = document.getElementById('metric');

   const calculate_button = document.getElementById('calculate-button');
   const reset_button = document.getElementById('reset-button');
   const height_field = document.querySelector('#height');
   const weight_field = document.querySelector('#weight');
   const bmi_message = document.querySelector('#bmi-message');

   let bmi_results = 0;

   calculate_button.addEventListener('click', calculateBMI);
   reset_button.addEventListener('onreset', resetForm);
   form.addEventListener('submit', e => {e.preventDefault()});

   function resetForm(e) {
      e.preventDefault();

   }

   function calculateImperialBMI(height, weight) {
      const height_result = height * height;
      const weight_result = weight * 703;

      return (weight_result / height_result).toFixed(2);
   }

   function calculateMetricBMI(height, weight) {
      const first_result = weight / height / height;

      return (first_result *10000).toFixed(2);
   }

   function calculateBMI() {
      const weight = weight_field.value;
      const height = height_field.value;

      if (weight === '' || weight === 0) {
         swal('Invalid Entry', 'Enter Valid Value For Weight!', 'error');
      }
      if (height === '' || height === 0) {
         swal('Invalid Entry', 'Enter Valid Value For Height!', 'error');
      }

      if (imperial_measurement.checked === false && metric_measurement.checked === false) {
         swal('Invalid Entry', 'Select Your Unit Of Measurement!', 'error');
      }

      if (imperial_measurement.checked && height !== '' && weight !== '') {
         bmi_results = calculateImperialBMI(height, weight);

      }
      if (metric_measurement.checked && height !== '' && weight !== '') {
         bmi_results = calculateMetricBMI(height, weight);
      }

      let text_message;
      let message_color;

      if (bmi_results < 18.5) {
         text_message = 'Underweight';
         message_color = 'text-blue';
      }
      else if (bmi_results >= 18.5 && bmi_results < 25) {
         text_message = 'Normal';
         message_color = 'text-green';
      }
      else if (bmi_results >= 25 && bmi_results < 30) {
         text_message = 'Overweight';
         message_color = 'text-yellow';
      }
      else if (bmi_results >= 30 && bmi_results < 40) {
         text_message = 'Obese';
         message_color = 'text-orange';
      }
      else {
         text_message = 'Extreme Obese';
         message_color = 'text-red';
      }

      if (
         (imperial_measurement.checked === true ||
            metric_measurement.checked === true) &&
         (height !== '' || height !== 0) &&
         (weight !== '' || weight !== 0) &&
         (bmi_results !== 0 || !isNaN())
      ) {
         bmi_message.innerHTML = `<p id="bmi-message">BMI = <b>${bmi_results} </b>(<span class="${message_color}"><b>${text_message}</b></span>)</p>`;

         bmi_message.style.visibility = 'visible';
      }

      setTimeout(() => {
         bmi_message.style.visibility = 'hidden';
      }, 5000)

   }

});