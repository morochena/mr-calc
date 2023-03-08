import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ztpbyaqtzgefhmibdale.supabase.co'
const supabaseKey = ""

const supabase = createClient(supabaseUrl, supabaseKey)

const availableEffects = [
  {
    id: 0,
    name: 'Attack',
    description: "takes an attack using the Caster's Magical Attack specialty that deals d10 DMG"
  },
  {
    id: 1,
    name: 'Attack (Targeted)',
    description: 'takes an attack which cannot be dodged that deals d10 DMG'
  },
  { id: 2, name: 'Create Element', description: 'creates {1}' },
  { id: 3, name: 'Destroy Element', description: 'destroys {1}' },
  {
    id: 4,
    name: 'Apply Force',
    description: 'is moved [tier] meters {meta|backwards}'
  },
  { id: 5, name: 'Damage', description: '+[tier] DMG' },
  { id: 6, name: 'Damage (Armor Piercing)', description: '[tier] AP' },
  {
    id: 7,
    name: 'Transform',
    description: 'turns [tier * 1000]cm^3 of [domain] into {meta|another element}'
  },
  {
    id: 8,
    name: 'Armor',
    description: ' gains [tier * 3] Armor point(s)'
  },
  {
    id: 9,
    name: 'Healing (1)',
    description: 'heals [tier] Body point(s)'
  },
  {
    id: 10,
    name: 'Healing (1d10)',
    description: 'heals [tier]d10 Body points'
  },
  {
    id: 11,
    name: 'Drain',
    description: 'any body points taken by the spell can be redistributed by the caster'
  },
  {
    id: 12,
    name: 'Restore Wound',
    description: 'changes the wound up by as many points as body healed, or [tier], whichever is lower'
  },
  {
    id: 13,
    name: 'Resurrect host (Holy)',
    description: 'is brought back to life by pulling their soul from the ether.  The soul has to belong to the specific body, and be willing to come back to the body.'
  },
  {
    id: 14,
    name: 'Resurrect host (Necromancy)',
    description: 'is brought back to life by either grabbing someone’s soul or creating a simulacrum from the ether. Normally the heal power does not work on dead targets, but coupled with the resurrection power, heals can add body points even if the target has less than their negative maximum body point total. Tthe soul can belong to anyone or can be an simulacrum made of many souls that doesn’t do anything unless commanded. A soul belonging to another body automatically gains a point of madness. It leaves its body after the spell is over.'
  },
  {
    id: 15,
    name: 'Emulate Item',
    description: 'emulates {meta|a sword} made of [domain] at 10 Structure Points or what the item had, whichever is less.'
  },
  {
    id: 16,
    name: 'Emulate Item',
    description: 'emulates {meta|a key} made of [domain] at 1 Structure Points or what the item had, whichever is less.'
  },
  {
    id: 17,
    name: 'Emulate Item',
    description: 'emulates {meta|a shield} made of [domain]'
  },
  {
    id: 18,
    name: 'Harden Item',
    description: 'Adds [tier] structure points to the {meta|equipped} item'
  },
  {
    id: 19,
    name: 'Harden Item (Earth)',
    description: 'Adds [tier] structure points to the {meta|equipped} item'
  },
  {
    id: 20,
    name: 'Animate Materials (Earth)',
    description: 'creates an animated golem with the following Stats: {meta|stats}'
  },
  {
    id: 21,
    name: 'Animate Materials (Necromancy)',
    description: 'creates an animated skeleton or ghoul with the following Stats: {meta|stats}'
  },
  {
    id: 22,
    name: 'Animate Materials (Nature)',
    description: 'creates an animated tree with the following Stats: {meta|stats}'
  },
  {
    id: 23,
    name: 'Animate Materials (Sorcery)',
    description: 'creates an animated item or cloth with the following Stats: {meta|stats}'
  },
  {
    id: 24,
    name: 'Control',
    description: 'acts against their interests for the duration of the spell if they have no mind points left or take [tier*5] damage to their mind. During the entire time the character is under control they can be given commands by the caster, and they have to follow those commands. The control wears off if the character is knocked out, or gains more than 10 Mind points.'
  },
  {
    id: 25,
    name: 'Control (Inanimate)',
    description: 'Animated inanimate objects only. Makes a character act against their interests for the duration of the spell if they have no mind points left. If they do, the spell does 5 damage to their mind. During the entire time the character is under control they can be given commands by the caster, and they have to follow those commands. The control wears off if the character is knocked out, or gains more than 10 Mind points.'
  },
  {
    id: 26,
    name: 'Control (Limited)',
    description: 'acts against their interests if it has an INT bonus of -2 or lower. Every time the character has to follow a command they do not consent to they can roll a Willpower-Self Control check vs [resist] to see if they snap out of it. If the user has Mind points left, it does [tier*2] damage per level of limited control.'
  },
  {
    id: 27,
    name: 'Control',
    description: 'acts against their interests for the duration of the spell if they have no mind points left or take [tier*5] damage to their mind. During the entire time the character is under control they can be given commands by the caster, and they have to follow those commands. The control wears off if the character is knocked out, or gains more than 10 Mind points.'
  },
  {
    id: 28,
    name: 'Control (Limited)',
    description: 'acts against their interests if it has an INT bonus of -2 or lower. Every time the character has to follow a command they do not consent to they can roll a Willpower-Self Control check vs[resist] to see if they snap out of it. If the user has Mind points left, it does [tier*2] damage per level of limited control.'
  },
  {
    id: 29,
    name: 'Apply Damaging Condition',
    description: '{1}, the highest of [tier]d10 damage per round for [tier] minutes or until they pass an action against difficulty [resist] to stop the condition'
  },
  {
    id: 30,
    name: 'Apply Haste Condition',
    description: 'gains a third action per turn for [tier] minutes'
  },
  {
    id: 31,
    name: 'Apply Sluggish Condition',
    description: 'loses an action per turn for [tier] minutes or until they pass an action against difficulty [resist] to stop the condition'
  },
  {
    id: 32,
    name: 'Apply Movement Condition',
    description: 'is trapped, {1}'
  },
  {
    id: 33,
    name: 'Temporary Body (1)',
    description: 'adds [tier] Body point(s) and {1} until the end of the spell'
  },
  {
    id: 34,
    name: 'Temporary Body (1d10)',
    description: 'adds [tier]d10 Body and {1} points until the end of the spell'
  },
  {
    id: 35,
    name: 'Geas (Conscious Actions)',
    description: 'is forced to {meta|perform a conscious action}  if they have less than d10+[tier] Mind Points, or otherwise they lose [tier] Mind Points'
  },
  {
    id: 36,
    name: 'Geas (Unconscious Actions)',
    description: 'is forced to {meta|perform an unconscious action} if they have less than d10+[tier] Mind Points, or otherwise they lose [tier] Mind Points'
  },
  {
    id: 37,
    name: 'Geas (Inanimate Object)',
    description: 'is forced to {meta|inanimate object} if they have less than d10+[tier] Mind Points, or otherwise they lose [tier] Mind Points'
  },
  {
    id: 38,
    name: 'Divination',
    description: 'gets to roll a die and use the result to replace any die they see rolled until the end of the spell'
  },
  {
    id: 39,
    name: 'Divination',
    description: 'gets to roll a die and use the result to replace any die they see rolled until the end of the spell'
  },
  {
    id: 40,
    name: 'Morph Form',
    description: 'changes into an {meta|wolf} animal of the same size as the creature'
  },
  {
    id: 41,
    name: 'Morph Form - Size',
    description: 'within [tier+1] size difference between the target and the animal'
  },
  {
    id: 42,
    name: 'Morph Form - Gear',
    description: 'keeping all their stuff'
  },
  {
    id: 43,
    name: 'Read Mind',
    description: 'has their {1} read if they are willing or have been reduced to 0 Mind, and lose 2 Mind if they resist'
  },
  {
    id: 44,
    name: 'Communicate Thought',
    description: 'communicate {1} to the caster,talk to another living thing within range of the spell, whether that be a human, animal or any other creature. The caster and target do not need to share a language, or even be able to speak a language. If they are unaware of the caster, count as an attack against the mind with damage 1'
  },
  {
    id: 45,
    name: 'Sense Magic',
    description: "Sense {meta|something}{1} magic, and only execute the rest of the spell once it's sensed"
  },
  {
    id: 46,
    name: 'Sense Life(Animal)',
    description: "Sense {meta|something}{1} living things, and only execute the rest of the spell once it's sensed"
  },
  {
    id: 47,
    name: 'Sense Gods, Good and Evil',
    description: "Sense {meta|something}{1} intent, and only execute the rest of the spell once it's sensed"
  },
  {
    id: 48,
    name: 'Sense souls',
    description: "Sense {meta|something}{1} soul, and only execute the rest of the spell once it's sensed"
  },
  {
    id: 49,
    name: 'Sense liquids',
    description: "Sense {meta|something}{1} liquid, and only execute the rest of the spell once it's sensed"
  },
  {
    id: 50,
    name: 'Sense temperature',
    description: "Sense {meta|something}{1} temperature, and only execute the rest of the spell once it's sensed"
  },
  {
    id: 51,
    name: 'Sense gases',
    description: "Sense {meta|something}{1} gas, and only execute the rest of the spell once it's sensed"
  },
  {
    id: 52,
    name: 'Sense plants and minerals',
    description: "Sense {meta|something}{1} plants and minerals, and only execute the rest of the spell once it's sensed"
  },
  {
    id: 53,
    name: 'End once Sensed',
    description: 'Once sensed, the spell ends'
  },
  {
    id: 54,
    name: 'Reset once Sensed',
    description: 'Once sensed, the spell goes back to a holding state'
  },
  {
    id: 55,
    name: 'Warp Light',
    description: 'hides something or causes it to glow, or reveal something visible elsewhere in range. If used to hide or become invisible, gives a disavdantage to finding the target, gives [tier-1] advantage to anyone using it'
  },
  {
    id: 56,
    name: 'Illusion',
    description: 'create a ficticious image,  gives [tier-1] advantage to anyone using it'
  },
  {
    id: 57,
    name: 'Silence',
    description: 'Dampens the volume of noises up to {1}, If used to hide or become silent, gives a [tier-1] advantage. Making a caster character silent means they can only use spells with the Stealth modifier or Cantrips until the silence ends'
  },
  {
    id: 58,
    name: 'Warp Space',
    description: 'connects two points within range with a portal'
  },
  {
    id: 59,
    name: 'Warp Weight',
    description: 'changes its weight by half or double [tier] times, which means it can be pushed as if it was lighter/heavier'
  },
  {
    id: 60,
    name: 'Warp Size',
    description: "changes its size by half or double [tier] times, changing the creature's size rating up or down by [tier]"
  },
  {
    id: 61,
    name: 'Cure Disease',
    description: 'Automatically count as a passed medical check against a disease'
  },
  {
    id: 62,
    name: 'Cure Infection',
    description: 'Automatically count as a passed medical check against an infection'
  },
  {
    id: 63,
    name: 'Cure Disease',
    description: 'Automatically count as a passed medical check against a disease but the target loses 1d10 Body points as their infected cells and the ones around it become devoid of life'
  },
  {
    id: 64,
    name: 'Cure Infection',
    description: 'Automatically count as a passed medical check against an infection but the target loses 1d10 Body points as their infected cells and the ones around it become devoid of life'
  },
  {
    id: 65,
    name: 'Induce Plague',
    description: 'must make a Physique - Constitution or Lore Medicine check of difficulty {1} at their next rest or be infected with Disease as if they have just been exposed to it'
  },
  {
    id: 66,
    name: 'Induce Madness',
    description: 'Makes an immediate roll of Willpower - Self Control of diffculty {1} or suffers a Madness attack as if they had a Madness of [tier]'
  },
  { id: 67, name: 'Light', description: 'illuminates {1}' },
  { id: 68, name: 'Noise', description: 'causes noise {1}' },
  {
    id: 69,
    name: 'Sound (Subject Matter)',
    description: 'creates sounds that {1}'
  },
  { id: 70, name: 'Sound (Volume)', description: 'at a volume of {1}' },
  {
    id: 71,
    name: 'Negate Magic',
    description: 'Ends all lasting spells with less SP than [tier] in the target area. New spells cast for the next turn have [tier] number added to their spell difficulty'
  },
  {
    id: 72,
    name: 'Help Strength Attribute',
    description: 'Add [tier] points to Strength'
  },
  {
    id: 73,
    name: 'Help Strength Skill',
    description: 'Add [tier*2] points to STR-{meta|physique}'
  },
  {
    id: 74,
    name: 'Help Strength Speciality',
    description: 'Add [tier*3] points to STR-{meta|armor}'
  },
  {
    id: 75,
    name: 'Help Dexterity Attribute',
    description: 'Add [tier] points to Dexterity'
  },
  {
    id: 76,
    name: 'Help Dexterity Skill',
    description: 'Add [tier*2] points to DEX-{meta|stealth}'
  },
  {
    id: 77,
    name: 'Help Dexterity Speciality',
    description: 'Add [tier*3] points to DEX-{meta|dodge}'
  },
  {
    id: 78,
    name: 'Help Intelligence Attribute',
    description: 'Add [tier] points to Intelligence'
  },
  {
    id: 79,
    name: 'Help Intelligence Skill',
    description: 'Add [tier*2] points to INT-{meta|reasoning}'
  },
  {
    id: 80,
    name: 'Help Intelligence Speciality',
    description: 'Add [tier*3] points to INT-{meta|consider}'
  },
  {
    id: 81,
    name: 'Help Empathy Attribute',
    description: 'Add [tier] points to Empathy'
  },
  {
    id: 82,
    name: 'Help Empathy Skill',
    description: 'Add [tier*2] points to EMP-{meta|willpower}'
  },
  {
    id: 83,
    name: 'Help Empathy Speciality',
    description: 'Add [tier*3] points to EMP-{meta|mind points}'
  },
  {
    id: 84,
    name: 'Hinder Strength Skill',
    description: 'Subtract [tier] points from Strength-{meta|physique}'
  },
  {
    id: 85,
    name: 'Hinder Strength Speciality',
    description: 'Subtract [tier*2] points from Strength-{meta|armor}'
  },
  {
    id: 86,
    name: 'Hinder Dexterity Skill',
    description: 'Subtract [tier] points from Dexterity-{meta|stealth}'
  },
  {
    id: 87,
    name: 'Hinder Dexterity Speciality',
    description: 'Subtract [tier*2] points from Dexterity-{meta|dodge}'
  },
  {
    id: 88,
    name: 'Hinder Intelligence Skill',
    description: 'Subtract [tier] points from Intelligence-{meta|reasoning}'
  },
  {
    id: 89,
    name: 'Hinder Intelligence Speciality',
    description: 'Subtract [tier*2] points from Intelligence-{meta|consider}'
  },
  {
    id: 90,
    name: 'Hinder Empathy Skill',
    description: 'Subtract [tier] points from Empathy-{meta|willpower}'
  },
  {
    id: 91,
    name: 'Hinder Empathy Speciality',
    description: 'Subtract [tier*2] points from Empathy-{meta|mind points}'
  },
  { id: 92, name: "Apply Dazed Condition", description: "gets disadvantage -[tier*2] to EMP and STR" },
  { id: 93, name: "Apply Blinded Condition", description: "gets disadvantage -[tier*2] to DEX and INT" },
  { id: 94, name: "Apply Deafened Condition", description: "gets disadvantage -[tier*2] to DEX and EMP" },
  { id: 95, name: "Apply Confused Condition", description: "gets disadvantage -[tier*2] to EMP and INT" },
  { id: 96, name: "Apply Enfeebled Condition", description: "gets disadvantage -[tier*2] to DEX and STR" },
  { id: 97, name: "Apply Befuddled Condition", description: "gets disadvantage -[tier*2] to INT and STR" },
  { id: 98, name: "Armor - All", description: "gains [tier] Armor point(s) on every body part" },
  { id: 99, name: "Armor - Specific", description: "gains [tier*4] Armor point(s) to {meta|helmet}" },
  { id: 100, name: "Weaken Item", description: "Subtracts [tier] structure points to the {meta|targeted} item" },
  { id: 101, name: "Weaken Item (Necro)", description: "Subtracts [tier] structure points to the {meta|targeted} item" },
]

const availableModifiers = [
  {
    id: 0,
    name: 'Ray',
    description: 'the targets must be in direct line of sight for the character for the entire duration of the spell or the spell fails'
  },
  { id: 1, name: 'Aura', description: 'is an Aura' },
  { id: 2, name: 'Reaction', description: 'as a Reaction' },
  { id: 3, name: 'Exhausting', description: '' },
  { id: 4, name: 'Uncomplicated', description: '' },
  {
    id: 5,
    name: 'Charge Up',
    description: 'taking 2 actions of obvious magical charging'
  },
  {
    id: 6,
    name: 'Dangerous',
    description: 'On a failure of the spell or a roll of a 1, the cost of the spell is increased by 6, and cannot be taken from Arcana. The cost can overflow from mind to body'
  },
  {
    id: 7,
    name: 'Painful',
    description: 'The cost applies to body as well as mind'
  },
  {
    id: 8,
    name: 'Stealth',
    description: 'is discreet, with no visible somatic or vocal components, nor any glow or magical energies.'
  },
  {
    id: 9,
    name: 'Somatic',
    description: 'requires both hands to perform {meta|a hand sign}'
  },
  {
    id: 10,
    name: 'Split',
    description: 'split into [tier+1] effects, each of which'
  },
  {
    id: 11,
    name: 'Range',
    description: 'has a range of {1} meters or {2} with disadvantage'
  },
  {
    id: 12,
    name: 'Trigger Action',
    description: 'the target has to {meta|whistle a tune} which takes an action in combat, or be restrained and have someone else perform the action for them'
  },
  {
    id: 13,
    name: 'Thwarted By',
    description: 'the target rolls their {1} bonus versus difficulty [resist]'
  },
  {
    id: 14,
    name: 'Area of Effect (Sphere)',
    description: 'covers a continuous Sphere with radius {1}.'
  },
  {
    id: 15,
    name: 'Area of Effect (Rectangle)',
    description: 'covers a continuous Rectangle with length {meta|0} and width {1}'
  },
  {
    id: 16,
    name: 'Area of Effect (Cone)',
    description: 'covers a continuous Cone with length {meta|0} and width {1}.'
  },
  {
    id: 17,
    name: 'Area of Effect (Custom)',
    description: 'covers a continuous polygon with area {1} meters Sq.'
  },
  {
    id: 18,
    name: 'Lasting (Rounds)',
    description: 'lasts for [tier+1] rounds'
  },
  {
    id: 19,
    name: 'Lasting (Minutes)',
    description: 'lasts for [tier] minutes'
  },
  {
    id: 20,
    name: 'Lasting (Hours)',
    description: 'lasts for [tier] hours'
  },
  {
    id: 21,
    name: 'Lasting (Days)',
    description: 'lasts for [tier] days'
  },
  {
    id: 22,
    name: 'Lasting (Weeks)',
    description: 'lasts for [tier] weeks'
  },
  {
    id: 23,
    name: 'Delay',
    description: "doesn't activate immediately, but instead goes off after {1}"
  },
  {
    id: 24,
    name: 'Concentration',
    description: "requires Concentration for the whole time the spell is cast, and any time the user is hurt they must make a 'Willpower-Concentration' roll versus the amount of damage they took"
  },
  {
    id: 25,
    name: 'Channelling',
    description: 'requires Channelling, giving up one action in combat or having disadvantage on anything else the duration of the spell'
  },
  {
    id: 26,
    name: 'Sculpted (Immune)',
    description: 'will not target the caster'
  },
  {
    id: 27,
    name: 'Sculpted (Pre-sculpted)',
    description: 'will not target {meta|friends}'
  },
  {
    id: 28,
    name: 'Sculpted (Sculpted)',
    description: 'will not target anyone chosen by the caster.'
  },
  {
    id: 29,
    name: 'Requires Component',
    description: 'requires a {meta|component}, of at least cost {1} Denar'
  },
  {
    id: 30,
    name: 'Bulky Component',
    description: 'the component is bulky'
  },
  {
    id: 31,
    name: 'Component Consumed',
    description: 'the component(s) are consumed'
  },
  {
    id: 32,
    name: 'Magical Runes (Runesmith only; Required for Runes)',
    description: 'is a magical rune with a charge'
  },
  {
    id: 33,
    name: 'Magical Rune Extra Charge(Runesmith only)',
    description: 'has [tier] charges'
  },
  {
    id: 34,
    name: 'Magical Rune Permanent (Runesmith only)',
    description: 'never loses charge'
  },
  {
    id: 35,
    name: 'Magical Rune Small(Runesmith only)',
    description: 'is a small rune'
  },
  {
    id: 36,
    name: 'Magical Rune Expendable (Runesmith only)',
    description: 'the rune is consumed'
  },
  {
    id: 37,
    name: 'Runesmith crafting (Runesmith only)',
    description: 'takes [(tier+2)*cost] hours to craft'
  },
  {
    id: 38,
    name: 'Alchemy (Alchemist only; Required for Alchemy)',
    description: 'is an alchemical item'
  },
  {
    id: 39,
    name: 'Alchemy brewing (Alchemist only)',
    description: 'takes [tier+cost] hours to craft'
  },
  {
    id: 40,
    name: 'Elongated Shelf Life (Alchemist only)',
    description: 'keeps for [tier+1] months'
  },
  { id: 41, name: "Mobile Origin", description: "origin can be moved between turns by the caster up to [tier*5]m" },
]

const up = async () => {

  let spellsToMigrate = []
  let { data: spells, error } = await supabase.from('spells').select('*')
  let { data: spells_v2, error_v2 } = await supabase.from('spells_v2').select('*')

  spells.forEach(async (spell) => {
    // if spell exists in spells_v2 by name, log it
    if (spells_v2.find((s) => s.name === spell.name)) {
      console.log(`- Spell '${spell.name}' already exists in spells_v2`)
      return
    }

    const selectedEffects = (spell.spell_data.effects || []).map((origEffect) => {
      let effect = availableEffects.find((e) => e.name === origEffect.name)
      if (!effect) {
        console.log(`- Effect '${origEffect.name}' not found`)
        return null
      }

      let meta = ""
      if (effect.description.includes("{meta")) {
        meta = origEffect.notes
      }

      return { id: effect.id, tier: origEffect.tier, meta: meta }
    })

    const selectedModifiers = (spell.spell_data.modifiers || []).map((origModifier) => {
      let modifier = availableModifiers.find((e) => e.name === origModifier.name)
      if (!modifier) {
        console.log(`- Modifier '${origModifier.name}' not found`)
        return null
      }

      let meta = ""
      if (modifier.description.includes("{meta")) {
        meta = origModifier.notes
      }

      return { id: modifier.id, tier: origModifier.tier, meta: meta }
    })

    const newSpell = {
      name: spell.name,
      user_id: spell.user_id,
      is_public: spell.is_public || false,
      tags: spell.tags,

      description: spell.spell_data.description,
      is_alchemy: spell.spell_data.isAlchemy || false,
      is_runesmith: spell.spell_data.isRunesmith || false,
      domain: spell.spell_data.domain,
      mode: spell.spell_data.mode || "Spell",

      selected_effects: selectedEffects,
      selected_modifiers: selectedModifiers,
    }

    spellsToMigrate.push(newSpell)
  })
  console.log(spellsToMigrate)

  // insert all spells into spells_v2
  spellsToMigrate.forEach(async (spell) => {
    console.log(".")
    let { data, error } = await supabase.from('spells_v2').insert([spell])
    if (error) {
      console.log(error)
    }
  })

}

up()
