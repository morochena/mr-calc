import type { Monster } from "../../../../types/types";
import skillPool from "../data/skills";
import { calcRawSkillBonus, calcRawSpecialtyBonus, formattedValue } from "./statCalculations";

export const formattedToHit = toHitValue => {
  return formattedValue(toHitValue);
}

export const formattedDamage = damageValue => {
  return formattedValue(damageValue);
}

export const toHit = (monster, roll_bonus, specialties, skills) => {
  let toHit = roll_bonus;
  if (specialties) {
    const bonuses = specialties.filter(e => !!e).map((specialty) => {
      const value = monster.specialties[specialty];
      if (value) {
        return calcRawSpecialtyBonus(monster, value);
      }
      return 0;
    });

    if (Math.max(bonuses) > 0) {
      return roll_bonus + Math.max(...bonuses)
    }
  }

  if (skills) {
    const bonuses = skills.map((skill) => {
      const skillValue = monster[skill];
      const skillPoolz = skillPool();
      const stat = skillPoolz.filter((s) => s.name == skill);
      if (stat.length === 0) return 0;
      const statValue = monster[stat[0].stat];
      return calcRawSkillBonus(statValue, skillValue);
    });

    return roll_bonus + Math.max(...bonuses);
  }

  return toHit;
};

export const damageCalculation = (monster: Monster, damage_formula: string) => {
  try {
    if (!damage_formula) return '';
    // eg. 3 + [str] + [dex]
    // extract the stats
    const stats = damage_formula.match(/\[.*?\]/g);
    // replace the stats with the monster's values
    const formula = stats.reduce((acc, stat) => {
      const statName = stat.replace(/[\[\]]/g, '');
      const statValue = formattedValue(monster[statName] - 5);
      return acc.replace(stat, statValue);
    }, damage_formula);

    return `1d10 ${formula}`;
  } catch (e) {
    return 'error';
  }
};