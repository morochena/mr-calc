import type { Monster, MonsterSkill, MonsterStat } from "../../../../types/fromSupabase";
import emptySkillPool from "../data/skills";

export const calcStatBonus = (stat) => {
  const value = Math.floor(stat - 5);
  if (value > 0) {
    return "+" + value;
  }
  return value;
};

export const calcTotalSkillBonus = (stat, skill) => {
  const value = calcRawSkillBonus(stat, skill);
  if (value > 0) {
    return "+" + value;
  }
  return value;
};

export const calcBonusValue = (monster: Monster, stat?: MonsterStat, skill?: MonsterSkill, speciality?: string) => {
  let value = 0;
  value += speciality ? (monster.specialties[speciality]?.value || 0 * 3) : 0;
  value += skill ? ((monster[skill] || 0) * 2) : 0;
  value += stat ? ((monster[stat] || 0) - 5) : 0

  return Math.floor(value);
}

export const calcBonusString = (monster: Monster, stat?: MonsterStat, skill?: MonsterSkill, speciality?: string) => {
  const value = calcBonusValue(monster, stat, skill, speciality);
  if (value > 0) {
    return "+" + value;
  }
  return value;
}

export const calcRawSkillBonus = (stat, skill) => {
  const skillValue = skill * 2;
  const statValue = stat - 5;
  return Math.floor(statValue + skillValue);
};

export const calcBody = (monster: Monster) => {
  const value = calcBonusValue(monster, "str", "physique") + 10;

  if (monster.size == "tiny") {
    return Math.floor(value / 4);
  } else if (monster.size == "small") {
    return Math.floor(value / 2);
  } else if (monster.size == "large") {
    return Math.floor(value * 2);
  } else if (monster.size == "huge") {
    return Math.floor(value * 3);
  } else if (monster.size == "gargantuan") {
    return Math.floor(value * 4);
  } else if (monster.size == "colossal") {
    return Math.floor(value * 6);
  }
  return value;
};

export const calcMind = (monster: Monster) => {
  return calcBonusValue(monster, "emp", "willpower") + 10
};

export const calcArcana = (monster: Monster) => {
  return Math.max(calcBonusValue(monster, "int", "lore", "arcana"), 0);
};

export const calcDodge = (monster: Monster) => {
  const value = calcBonusValue(monster, "dex", "stealth", "dodge") + 7

  if (monster.size == "tiny") {
    return value + 4;
  } else if (monster.size == "small") {
    return value + 2;
  } else if (monster.size == "large") {
    return value - 2;
  } else if (monster.size == "huge") {
    return value - 3;
  } else if (monster.size == "gargantuan") {
    return value - 4;
  } else if (monster.size == "colossal") {
    return value - 6;
  }

  return value;
};

export const calcPerception = (monster) => {
  return Math.floor(calcBonusValue(monster, "dex", "notice", "perception") / 2) + 7;

};

export const calcConsider = (monster) => {
  return Math.floor(calcBonusValue(monster, "int", "reasoning", "consider") / 2) + 7;
};

export const calcMove = (monster) => {
  return Math.ceil((monster.dex - 5) / 2) + 5;
};

export const calcRun = (monster) => {
  const baseRun = calcMove(monster) * 2 + 10;
  const skillBonus = calcRawSkillBonus(monster.str, monster.athletics);
  const specialityBonus = (monster.specialties.Running?.value || 0) * 3;

  const combined = skillBonus + specialityBonus;

  return Math.floor(combined * 2) + baseRun;
};

export const calcLevel = (monster) => {
  let level = 0;

  const scaleAdd = (stat) => {
    let xp = 0;
    for (let i = 0; i <= stat; i++) {
      xp += i;
    }

    return xp;
  };

  level += scaleAdd(monster.str - 8);
  level += scaleAdd(monster.dex - 8);
  level += scaleAdd(monster.emp - 8);
  level += scaleAdd(monster.int - 8);

  const skills = emptySkillPool()

  for (const skill of skills) {
    level += scaleAdd(monster[skill.name]);
  }

  for (const specialty in monster.specialties) {
    level += scaleAdd(monster.specialties[specialty]);
  }

  return level;
};

export const calcRawSpecialtyBonus = (monster, specialty) => {
  const skill = specialty.skill;
  const skillStat = emptySkillPool().find(s => s.name === skill)?.stat || 0;
  const totalSkillBonus = calcRawSkillBonus(monster[skillStat], monster[skill]);

  const specialtyBonus = specialty.value * 3;

  return totalSkillBonus + specialtyBonus;
}

export const calcSpecialtyBonus = (monster, specialty) => {
  const value = calcRawSpecialtyBonus(monster, specialty);
  if (value > 0) {
    return "+" + value;
  }
  return value;
}

export const formattedValue = (value) => {
  if (value > 0) {
    return "+" + value;
  }
  return value;
}