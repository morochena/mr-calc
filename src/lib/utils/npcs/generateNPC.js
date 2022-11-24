import skillPool from "../data/skills";
import { combatSpecialtylist } from "../data/specialties";


export const generateMonster = (monster, skills = true) => {

  monster = generateBaseStats(monster);

  if (skills) {
    monster = generateSkills(monster);
    // monster = generateSpecialties(monster);

    // apply skills to main monster object 
    monster.skills.forEach(skill => {
      monster[skill.name] = skill.value;
    })

    delete monster.skills
  }

  return monster;
}

export const generateTheme = (monster) => {

}


const generateBaseStats = (monster) => {
  let str = roll2d10();
  let dex = roll2d10();
  let emp = roll2d10();
  let int = roll2d10();

  // modify bonus stats if size large, huge, or gargantuan
  if (monster.size == "large") {
    str += Math.floor(Math.random() * 3) + 1;
    dex -= Math.floor(Math.random() * 3) + 1;
  } else if (monster.size == "huge") {
    str += Math.floor(Math.random() * 6) + 1;
    dex -= Math.floor(Math.random() * 4) + 1;
  } else if (monster.size == "gargantuan") {
    str += Math.floor(Math.random() * 9) + 1;
    dex -= Math.floor(Math.random() * 5) + 1;
  }

  // modify bonus stats based on difficulty 
  if (monster.difficulty == "pathetically weak") {
    str -= Math.floor(Math.random() * 3) + 1;
    dex -= Math.floor(Math.random() * 3) + 1;
    emp -= Math.floor(Math.random() * 3) + 1;
    int -= Math.floor(Math.random() * 3) + 1;
  } else if (monster.difficulty == "weak") {
    str -= Math.floor(Math.random() * 2) + 1;
    dex -= Math.floor(Math.random() * 2) + 1;
    emp -= Math.floor(Math.random() * 2) + 1;
    int -= Math.floor(Math.random() * 2) + 1;
  } else if (monster.difficulty == "powerful") {
    str += Math.floor(Math.random() * 3) + 1;
    dex += Math.floor(Math.random() * 3) + 1;
    emp += Math.floor(Math.random() * 3) + 1;
    int += Math.floor(Math.random() * 3) + 1;
  } else if (monster.difficulty == "very powerful") {
    str += Math.floor(Math.random() * 4) + 1;
    dex += Math.floor(Math.random() * 4) + 1;
    emp += Math.floor(Math.random() * 4) + 1;
    int += Math.floor(Math.random() * 4) + 1;
  } else if (monster.difficulty == "extremely powerful") {
    str += Math.floor(Math.random() * 6) + 1;
    dex += Math.floor(Math.random() * 6) + 1;
    emp += Math.floor(Math.random() * 6) + 1;
    int += Math.floor(Math.random() * 6) + 1;
  }

  // if magic user, add int and emp and reduce str and dex 
  if (monster.magic_user) {
    str -= Math.floor(Math.random() * 2) + 1;
    dex -= Math.floor(Math.random() * 2) + 1;
    emp += Math.floor(Math.random() * 2) + 1;
    int += Math.floor(Math.random() * 2) + 1;
  }

  // ensure each stat is at least 0 
  str = Math.max(str, 0);
  dex = Math.max(dex, 0);
  emp = Math.max(emp, 0);
  int = Math.max(int, 0);

  monster.str = str;
  monster.dex = dex;
  monster.emp = emp;
  monster.int = int;

  return monster;
}

const generateSkills = (monster) => {
  // generate xp pool from difficulty 
  let xp_pool = 0;
  if (monster.difficulty == "pathetically weak") {
    xp_pool = Math.floor(Math.random() * 5) + 4;
  } else if (monster.difficulty == "weak") {
    xp_pool = Math.floor(Math.random() * 10) + 10;
  } else if (monster.difficulty == "average") {
    xp_pool = Math.floor(Math.random() * 10) + 20;
  } else if (monster.difficulty == "hard") {
    xp_pool = Math.floor(Math.random() * 10) + 30;
  } else if (monster.difficulty == "deadly") {
    xp_pool = Math.floor(Math.random() * 10) + 40;
  } else if (monster.difficulty == "epic") {
    xp_pool = Math.floor(Math.random() * 10) + 50;
  }

  // determine proportion of xp pool based on stats
  const strPrc = monster.str / (monster.str + monster.dex + monster.emp + monster.int);
  const dexPrc = monster.dex / (monster.str + monster.dex + monster.emp + monster.int);
  const empPrc = monster.emp / (monster.str + monster.dex + monster.emp + monster.int);
  const intPrc = monster.int / (monster.str + monster.dex + monster.emp + monster.int);

  monster.skills = skillPool();

  // until xp pool is empty, assign xp to skills
  while (xp_pool > 0) {
    // choose stat to assign xp to
    const value = Math.random() * (strPrc + dexPrc + empPrc + intPrc);
    let stat = "";
    if (value < strPrc) {
      stat = "str";
    } else if (value < strPrc + dexPrc) {
      stat = "dex";
    } else if (value < strPrc + dexPrc + empPrc) {
      stat = "emp";
    } else {
      stat = "int";
    }

    // choose skill to assign xp to
    const skill = monster.skills.filter(x => x.stat == stat)[Math.floor(Math.random() * monster.skills.filter(x => x.stat == stat).length)];
    skill.value += 1;

    xp_pool -= skill.value;
  }

  // cap all skills at 3 
  monster.skills.forEach(skill => {
    skill.value = Math.min(skill.value, 3);
  });

  return monster;
}

const generateSpecialties = (monster) => {

  monster.specialties = {}

  let specialtyCount = 0;
  if (monster.difficulty == "pathetically weak") {
    specialtyCount = Math.floor(Math.random() * 2);
  }
  else if (monster.difficulty == "weak") {
    specialtyCount = Math.floor(Math.random() * 4);
  }
  else if (monster.difficulty == "average") {
    specialtyCount = Math.floor(Math.random() * 6);
  }
  else if (monster.difficulty == "hard") {
    specialtyCount = Math.floor(Math.random() * 8);
  }
  else if (monster.difficulty == "deadly") {
    specialtyCount = Math.floor(Math.random() * 10);
  }
  else if (monster.difficulty == "epic") {
    specialtyCount = Math.floor(Math.random() * 12);
  }

  while (specialtyCount > 0) {
    // choose a random specialty from the list that corresponds to the monster's skills 
    const specialty = combatSpecialtylist[Math.floor(Math.random() * combatSpecialtylist.length)];
    const skill = monster.skills.filter(x => x.stat == specialty.stat && x.name == specialty.skill)[0];
    if (skill) {
      // if the specialty is already in the list, add 1 to the value
      if (monster.specialties[specialty.name]) {
        monster.specialties[specialty.name].value += 1
      } else {
        monster.specialties[specialty.name] = { stat: specialty.stat, skill: specialty.skill, value: 1 };
      }
      specialtyCount -= 1;
    }
  }

  return monster;
}

const roll2d10 = () => {
  return Math.max(Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1);
}