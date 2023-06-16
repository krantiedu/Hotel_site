
var isFormValid = false;
var drawerOpen = false;

function calculateNumberOfDays(checkinDate, checkoutDate) {
  const oneDay = 24 * 60 * 60 * 1000; // Hours * Minutes * Seconds * Milliseconds
  const startDate = new Date(checkinDate);
  const endDate = new Date(checkoutDate);
  const numberOfDays = Math.round(Math.abs((startDate - endDate) / oneDay));
  return numberOfDays;
}

// Function to handle the form submission
function handleSubmit(event) {
  console.log("form submited");
  if (Check_in.value === "" || Check_out.value === "") return;

  const checkinDate = document.getElementById("Check_in").value;
  const checkoutDate = document.getElementById("Check_out").value;
  const error = document.querySelector("#error");
  if (checkinDate > checkoutDate) {
    console.log(
      "Invalid date selection. Check-in date must be smaller than the checkout date."
    );
    error.textContent = "Invalid date selected."
    isFormValid = false;
    document.querySelector("#reserve").disabled = !isFormValid;
    return;
  }
  const amountSpan = document.querySelector("#amount p:first-child + span");
  const amountPara = document.querySelector("#amount p:first-child");
  const discountSpan = document.querySelector("#discount p:first-child + span");
  const totalAmountSpan = document.querySelector("#total_amount p:first-child + span");
  const payCheckIn = document.querySelector("#Check_in_date p:first-child + div");
  const payCheckOut = document.querySelector("#Check_out_date p:first-child + div");
  const numberOfDays = calculateNumberOfDays(checkinDate, checkoutDate);
  const totalAmount = numberOfDays > 1 ? numberOfDays * 5000 : 5000;
  const billAmount = numberOfDays >= 7 ? totalAmount : totalAmount+500;
  amountSpan.textContent = `₹${totalAmount}`;
  amountPara.textContent = numberOfDays > 1 ? `₹5000 * ${numberOfDays} nights` : `₹5000 * 1 night`;
  discountSpan.textContent = numberOfDays >= 7 ? `- ₹500` : `nil`
  totalAmountSpan.textContent = `₹${billAmount}`;
  error.textContent = "";
  isFormValid = true;
  payCheckIn.textContent = `${checkinDate}`;
  payCheckOut.textContent = `${checkoutDate}`;
  document.querySelector('#half_pay').textContent = `Pay ₹${billAmount/2} now, and ₹${billAmount/2} later.`
  document.querySelector('#full_pay').textContent = `Full Payment of ₹${billAmount}.`
  console.log(totalAmount);
  document.querySelector("#reserve").disabled = !isFormValid;
}

function clickHandler(event){
    console.log("clicked");
    document.querySelector(".payment_wrap").classList.add('payment_wrap_show');
}
function payBoxCloser(event){
    document.querySelector(".payment_wrap").classList.remove('payment_wrap_show');
}
function openBookingBox(event){
    document.querySelector(".maps_booking_wrap").classList.add('maps_booking_wrap_open');
}
function closeBookingBox(event){
    document.querySelector(".maps_booking_wrap").classList.remove('maps_booking_wrap_open');
}
function drawerOpener(event){
  if (!drawerOpen) {
    document.querySelector(".navbar_drawer").classList.add('navbar_drawer_show');
    document.querySelector("#drawer_opener").classList.remove('fa-bars');
    document.querySelector("#drawer_opener").classList.add('fa-xmark');
    drawerOpen = true;
  }else{
    document.querySelector(".navbar_drawer").classList.remove('navbar_drawer_show');
    document.querySelector("#drawer_opener").classList.remove('fa-xmark');
    document.querySelector("#drawer_opener").classList.add('fa-bars');
    drawerOpen = false;
  }
}

// Event listener to listen for form submission
const Check_in = document.getElementById("Check_in");
const Check_out = document.getElementById("Check_out");
Check_in.addEventListener("change", handleSubmit);
Check_out.addEventListener("change", handleSubmit);
document.querySelector("#reserve").addEventListener("click",clickHandler); 
document.querySelector("#close_paybox").addEventListener("click",payBoxCloser);
document.querySelector("#booking_button").addEventListener("click",openBookingBox);
document.querySelector("#booking_close").addEventListener("click",closeBookingBox);
document.querySelector("#drawer_opener").addEventListener("click",drawerOpener);

