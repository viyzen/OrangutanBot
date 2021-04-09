import { ICommand } from "../../abstracts/abstract-command";
import { DddResult } from "./ddd-types";

class Ddd implements ICommand {
  name = "ddd";
  help =
    'Delicious and divine, or any other combination of "d" words (up to 20) auto generated, or use --r to get a random amount';

  execute(parameters: { wordCount: number }): DddResult {
    return this.ddd(parameters.wordCount);
  }

  private ddd(wordCount: number): DddResult {
    const dWords = [];

    for (let i = 0; i < wordCount; i++) {
      dWords.push(this.getDWord());
    }

    return { dWordList: dWords };
  }

  private getDWord(): string {
    return this.words[Math.floor(Math.random() * this.words.length)];
  }

  private words = [
    "daffy",
    "daft",
    "daily",
    "dainty",
    "damaged",
    "damaging",
    "damp",
    "danceable",
    "dandy",
    "dangerous",
    "dapper",
    "daring",
    "dark",
    "darkened",
    "dashing",
    "daughterly",
    "daunting",
    "dawdling",
    "day",
    "dazed",
    "dazzling",
    "dead",
    "deadly",
    "deadpan",
    "deaf",
    "deafening",
    "dear",
    "debatable",
    "debonair",
    "decadent",
    "decayed",
    "decaying",
    "deceitful",
    "deceivable",
    "deceiving",
    "decent",
    "decentralized",
    "deceptive",
    "decimated",
    "decipherable",
    "decisive",
    "declining",
    "decorative",
    "decorous",
    "decreasing",
    "decrepit",
    "dedicated",
    "deep",
    "deepening",
    "defeated",
    "defective",
    "defendable",
    "defenseless",
    "defensible",
    "defensive",
    "defiant",
    "deficient",
    "definable",
    "definitive",
    "deformed",
    "degenerative",
    "degraded",
    "dehydrated",
    "dejected",
    "delectable",
    "deliberate",
    "deliberative",
    "delicate",
    "delicious",
    "delighted",
    "delightful",
    "delinquent",
    "delirious",
    "deliverable",
    "deluded",
    "demanding",
    "demented",
    "democratic",
    "demonic",
    "demonstrative",
    "demure",
    "deniable",
    "dense",
    "dependable",
    "dependent",
    "deplorable",
    "deploring",
    "depraved",
    "depressed",
    "depressing",
    "depressive",
    "deprived",
    "deranged",
    "derivative",
    "derogative",
    "derogatory",
    "descriptive",
    "deserted",
    "designer",
    "desirable",
    "desirous",
    "desolate",
    "despairing",
    "desperate",
    "despicable",
    "despised",
    "despondent",
    "destroyed",
    "destructive",
    "detachable",
    "detached",
    "detailed",
    "detectable",
    "determined",
    "detestable",
    "detrimental",
    "devastated",
    "devastating",
    "devious",
    "devoted",
    "devout",
    "dexterous",
    "diabolical",
    "diagonal",
    "didactic",
    "different",
    "difficult",
    "diffuse",
    "digestive",
    "digital",
    "dignified",
    "digressive",
    "dilapidated",
    "diligent",
    "dim",
    "diminishing",
    "diminutive",
    "dingy",
    "diplomatic",
    "dire",
    "direct",
    "direful",
    "dirty",
    "disabled",
    "disadvantaged",
    "disadvantageous",
    "disaffected",
    "disagreeable",
    "disappearing",
    "disappointed",
    "disappointing",
    "disapproving",
    "disarming",
    "disastrous",
    "discarded",
    "discernable",
    "disciplined",
    "disconnected",
    "discontented",
    "discordant",
    "discouraged",
    "discouraging",
    "discourteous",
    "discredited",
    "discreet",
    "discriminating",
    "discriminatory",
    "discussable",
    "disdainful",
    "diseased",
    "disenchanted",
    "disgraceful",
    "disgruntled",
    "disgusted",
    "disgusting",
    "disheartened",
    "disheartening",
    "dishonest",
    "dishonorable",
    "disillusioned",
    "disinclined",
    "disingenuous",
    "disinterested",
    "disjointed",
    "dislikeable",
    "disliked",
    "disloyal",
    "dismal",
    "dismissive",
    "disobedient",
    "disorderly",
    "disorganized",
    "disparaging",
    "disparate",
    "dispassionate",
    "dispensable",
    "displaced",
    "displeased",
    "displeasing",
    "disposable",
    "disproportionate",
    "disproved",
    "disputable",
    "disputatious",
    "disputed",
    "disreputable",
    "disrespectful",
    "disruptive",
    "dissatisfied",
    "dissimilar",
    "dissolvable",
    "dissolving",
    "dissonant",
    "dissuasive",
    "distant",
    "distasteful",
    "distinct",
    "distinctive",
    "distinguished",
    "distracted",
    "distracting",
    "distraught",
    "distressed",
    "distressing",
    "distrustful",
    "disturbed",
    "disturbing",
    "divergent",
    "diverging",
    "diverse",
    "diversified",
    "divided",
    "divine",
    "divisive",
    "dizzy",
    "dizzying",
    "doable",
    "documentary",
    "dogged",
    "doggish",
    "dogmatic",
    "doleful",
    "dollish",
    "domed",
    "domestic",
    "dominant",
    "domineering",
    "dorsal",
    "doting",
    "double",
    "doubtful",
    "doubting",
    "dovish",
    "dowdy",
    "down",
    "down-And-Out",
    "downhearted",
    "downloadable",
    "downtown",
    "downward",
    "dozing",
    "drab",
    "drained",
    "dramatic",
    "drastic",
    "dreaded",
    "dreadful",
    "dreaming",
    "dreamy",
    "dreary",
    "drenched",
    "dress",
    "dressy",
    "dried",
    "dripping",
    "drivable",
    "driven",
    "droll",
    "drooping",
    "droopy",
    "drowsy",
    "drunk",
    "dry",
    "dual",
    "dubious",
    "due",
    "dulcet",
    "dull",
    "duplicitous",
    "durable",
    "dusty",
    "dutiful",
    "dwarfish",
    "dwindling",
    "dynamic",
    "dysfunctional",
  ];
}

export const ddd = new Ddd();