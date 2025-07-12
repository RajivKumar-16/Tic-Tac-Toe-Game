document.addEventListener("DOMContentLoaded", () => {
  const allBox = document.querySelectorAll(".box");
  const reset = document.getElementById("reset");
  const show = document.getElementById("the-winner");
  const showDetails = document.getElementById("game");
  const flipBox = document.getElementById("flip-container");

  let turnO = true;
  let rotAngle = 180;

  const winpattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  allBox.forEach((box) => {
    box.addEventListener("click", () => {
      console.log("Clicked");
      if (turnO) {
        box.innerText = "O";
        turnO = false;
      } else {
        box.innerText = "X";
        turnO = true;
      }
      box.disabled = true;
      checkwinner();
    });
  });

  function showDeveloper() {
    flipBox.style.transform = `rotateY(${rotAngle}deg)`;
    rotAngle+=180;
    console.log(rotAngle);
    // if (rotAngle < 0) {
    //   document.getElementById("box-but").style.display = "none";
    // }else{
    //   document.getElementById("box-but").style.display = "grid";
    // }
  }

  function disabledEnable(num) {
    for (let box of allBox) {
      if (num) {
        box.disabled = true;
      } else {
        box.disabled = false;
        box.innerText = "";
      }
    }
  }

  function resetfun() {
    turnO = true;
    disabledEnable(false);
    document.getElementById("box-but").style.display = "grid";
    show.style.display = "none";
    reset.innerText = "Reset";
  }

  function showwinner(token) {
    console.log(token);
    document.getElementById("box-but").style.display = "none";
    reset.innerText = "New Game";
    show.style.display = "flex";
    disabledEnable(true);
    if (token == "D") {
      show.innerHTML = `<p>It's a Draw</p>`;
    } else {
      show.innerHTML = `<p>Congratulation, Player ${token}<br>You Win</p>`;
    }
  }

  const checkwinner = () => {
    let count = 0;
    for (pattern of winpattern) {
      let posvalue1 = allBox[pattern[0]].innerText;
      let posvalue2 = allBox[pattern[1]].innerText;
      let posvalue3 = allBox[pattern[2]].innerText;
      if (posvalue1 != "" && posvalue2 != "" && posvalue3 != "") {
        if (posvalue1 === posvalue2 && posvalue2 === posvalue3) {
          showwinner(posvalue1);
          // console.log(posvalue1);
        } else {
          count++;
          if (count == 8) {
            showwinner("D");
          }
        }
      }
    }
  };

  reset.addEventListener("click", resetfun);
  showDetails.addEventListener("click", showDeveloper);
});
