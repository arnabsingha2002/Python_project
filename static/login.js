const form = document.querySelector("form");
eField = form.querySelector(".email"),
eInput = eField.querySelector("input"),
pField = form.querySelector(".password"),
pInput = pField.querySelector("input");

form.onsubmit = (e)=>{
  e.preventDefault(); //preventing form from submitting
  //if email and password are blank, add shake class; otherwise, call specified function
  (eInput.value == "") ? eField.classList.add("shake", "error") : checkEmail();
  (pInput.value == "") ? pField.classList.add("shake", "error") : checkPass();

  setTimeout(()=>{ //remove shake class after 500ms
    eField.classList.remove("shake");
    pField.classList.remove("shake");
  }, 500);

  eInput.onkeyup = ()=>{checkEmail();} //calling checkEmail function on email input keyup
  pInput.onkeyup = ()=>{checkPass();} //calling checkPassword function on pass input keyup

  function checkEmail(){ //checkEmail function
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validating email
    if(!eInput.value.match(pattern) || !eInput.value.endsWith("@ashoka.edu.in")){ //if pattern not matched or email doesn't end with "@ashoka.edu.in", add error and remove valid class
      eField.classList.add("error");
      eField.classList.remove("valid");
      let errorTxt = eField.querySelector(".error-txt");
      //if email value is not empty then show "Please enter a valid email address"; otherwise, show "Email can't be blank"
      (eInput.value != "") ? errorTxt.innerText = "Enter a valid ashoka.edu.in email address" : errorTxt.innerText = "Email can't be blank";
    }else{ //if pattern matched and email ends with "@ashoka.edu.in", remove error and add valid class
      eField.classList.remove("error");
      eField.classList.add("valid");
    }
  }

  function checkPass(){ //checkPass function
    if(pInput.value == ""){ //if password is empty, add error and remove valid class
      pField.classList.add("error");
      pField.classList.remove("valid");
    }else{ //if password is not empty, remove error and add valid class
      pField.classList.remove("error");
      pField.classList.add("valid");
    }
  }

  //if eField and pField don't contain error class, that means user filled in details properly
  if(!eField.classList.contains("error") && !pField.classList.contains("error")){
    window.location.href = form.getAttribute("action"); //redirect user to the specified URL inside action attribute of form tag
  }
}
