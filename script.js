/* ==========================================
   SMART DRIVER SAFETY SYSTEM
   ========================================== */


/* SENSOR VARIABLES */

let driverPresent = false;

let sleeping = false;

let alcohol = 0;


/* HTML ELEMENTS */

const driverStatus =
    document.getElementById("driverStatus");

const alcoholStatus =
    document.getElementById("alcoholStatus");

const sleepStatus =
    document.getElementById("sleepStatus");

const alcoholSlider =
    document.getElementById("alcoholSlider");

const alcoholReading =
    document.getElementById("alcoholReading");

const vehicleStatus =
    document.getElementById("vehicleStatus");

const alertMessage =
    document.getElementById("alertMessage");

const movementStatus =
    document.getElementById("movementStatus");

const car =
    document.getElementById("car");

const road =
    document.getElementById("road");


/* ==========================================
   DRIVER BUTTON
   ========================================== */

document.getElementById("driverButton").onclick =
function () {

    driverPresent = !driverPresent;

    updateSystem();

};


/* ==========================================
   SLEEP BUTTON
   ========================================== */

document.getElementById("sleepButton").onclick =
function () {

    sleeping = !sleeping;

    updateSystem();

};


/* ==========================================
   ALCOHOL SENSOR
   ========================================== */

alcoholSlider.oninput = function () {

    alcohol = Number(this.value);

    alcoholStatus.innerText = alcohol;

    alcoholReading.innerText = alcohol;

    updateSystem();

};


/* ==========================================
   RESET
   ========================================== */

document.getElementById("resetButton").onclick =
function () {

    driverPresent = false;

    sleeping = false;

    alcohol = 0;

    alcoholSlider.value = 0;

    alcoholStatus.innerText = "0";

    alcoholReading.innerText = "0";

    updateSystem();

};


/* ==========================================
   MAIN SAFETY SYSTEM
   ========================================== */

function updateSystem() {


    /* DRIVER STATUS */

    if (driverPresent) {

        driverStatus.innerText =
            "PRESENT";

    } else {

        driverStatus.innerText =
            "NO DRIVER";

    }


    /* SLEEP STATUS */

    if (sleeping) {

        sleepStatus.innerText =
            "SLEEP DETECTED";

    } else {

        sleepStatus.innerText =
            "AWAKE";

    }


    /*
       SAFETY CONDITION

       Driver must be present
       AND
       Driver must be awake
       AND
       Alcohol must be LESS THAN 30
    */

    const canDrive =
        driverPresent === true &&
        sleeping === false &&
        alcohol < 30;


    /* ======================================
       ALLOW VEHICLE
       ====================================== */

    if (canDrive) {

        /* STATUS */

        vehicleStatus.innerText =
            "✅ VEHICLE SAFE - MOVING";

        vehicleStatus.className =
            "safe";


        /* MESSAGE */

        alertMessage.innerText =
            "✅ Driver present • Awake • Alcohol below limit";


        /* CAR START */

        car.classList.remove("carStopped");

        car.classList.add("carMoving");


        /* ROAD START */

        road.classList.add("roadMoving");


        /* MOVEMENT TEXT */

        movementStatus.innerText =
            "🚗 VEHICLE IS MOVING";

    }


    /* ======================================
       STOP VEHICLE
       ====================================== */

    else {

        /* STATUS */

        vehicleStatus.innerText =
            "🚫 VEHICLE STOPPED";

        vehicleStatus.className =
            "blocked";


        /* STOP CAR */

        car.classList.remove("carMoving");

        car.classList.add("carStopped");


        /* STOP ROAD */

        road.classList.remove("roadMoving");


        /* MOVEMENT */

        movementStatus.innerText =
            "🛑 VEHICLE IS STOPPED";


        /* REASON */

        if (!driverPresent) {

            alertMessage.innerText =
                "⚠️ Vehicle stopped: No driver detected";

        }

        else if (sleeping) {

            alertMessage.innerText =
                "😴 Vehicle stopped: Sleep detected";

        }

        else if (alcohol >= 30) {

            alertMessage.innerText =
                "🍺 Vehicle stopped: Alcohol level is 30 or above";

        }

    }

}


/* ==========================================
   START SYSTEM
   ========================================== */

updateSystem();