import { calcRawSkillBonus, calcRawSpecialtyBonus } from "./calculations";
import skillPool from "./data/skills";


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
      return roll_bonus + Math.max(bonuses)
    }
  }

  if (skills) {
    const bonuses = skills.map((skill) => {
      const skillValue = monster[skill];
      const stat = skillPool().find((s) => s.name == skill).stat;
      const statValue = monster[stat];
      return calcRawSkillBonus(statValue, skillValue);
    });

    return roll_bonus + Math.max(bonuses);
  }

  return toHit;
};

export const damageCalculation = (monster, damage_formula) => {
  try {
    if (!damage_formula) return '';
    // eg. 3 + [str] + [dex]
    // extract the stats
    const stats = damage_formula.match(/\[.*?\]/g);
    // replace the stats with the monster's values
    const formula = stats.reduce((acc, stat) => {
      const statName = stat.replace(/[\[\]]/g, '');
      const statValue = monster[statName] - 5;
      return acc.replace(stat, statValue);
    }, damage_formula);

    return `1d10 + ${formula}`;
  } catch (e) {
    return 'error';
  }
};