const axios = require("axios");
axios
  .get(
    "https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.json"
  )
  .then((response) => {
    const obj = response.data;
    let newObj = {};
    for (let i = 0; i < obj.rounds.length; i++) {
      for (let j = 0; j < obj.rounds[i].matches.length; j++) {
        let match = obj.rounds[i].matches[j];

        console.log(
          `${match.date}\n${match.team1.name} : ${match.score1}\n${match.team2.name} : ${match.score2}\n-----`
        );

        // Bonus : Classement meilleurs butteurs
        if (
          (match.goals1 && match.goals1.length !== 0) ||
          (match.goals2 && match.goals2.length !== 0)
        ) {
          const totalGoals = match.goals1.concat(match.goals2);
          for (let k = 0; k < totalGoals.length; k++) {
            const familyName =
              totalGoals[k].name.split(" ")[
                totalGoals[k].name.split(" ").length - 1
              ];
            if (!newObj.hasOwnProperty(familyName)) {
              newObj[familyName] = 1;
            } else {
              newObj[familyName] += 1;
            }
          }
        }
      }
    }

    const arrayOfPlayers = Object.keys(newObj);

    const arrayOfGoals = Object.values(newObj);
    arrayOfGoals.sort(function (a, b) {
      return b - a;
    });
    const arrayOfGoals2 = arrayOfGoals.slice(0, 3);

    let newTab = [];
    for (let i = 0; i < arrayOfGoals2.length; i++) {
      for (let j = 0; j < arrayOfPlayers.length; j++) {
        if (
          arrayOfGoals2[i] === newObj[arrayOfPlayers[j]] &&
          !newTab.includes(arrayOfPlayers[j])
        ) {
          newTab.push(arrayOfPlayers[j]);
        }
      }
    }

    const result =
      newTab.slice(0, newTab.length - 1).join(", ") +
      " et " +
      newTab[newTab.length - 1];
    console.log(`Les meilleurs buteurs sont ${result}`);
  })
  .catch((error) => {
    console.log(error.response);
  });
