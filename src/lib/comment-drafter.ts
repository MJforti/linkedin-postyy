import { CommentDraft, ReactionType } from "./types";
import { humanizeLinkedInText } from "./humanizer";

export interface CommentTemplate {
  name: string;
  reaction: ReactionType;
  description: string;
  whyThisFits: string;
  generate: (postSnippet: string, userPerspective?: string) => string;
}

export const COMMENT_TEMPLATES: CommentTemplate[] = [
  {
    name: "Answer the Closing Question",
    reaction: "INTEREST",
    description: "Direct, high-relevance answer to the author's ending prompt.",
    whyThisFits: "Authors check comments to see answers to their own question first.",
    generate: (snippet, perspective) => {
      return `Spot on observation. In our own workflow, the biggest shift was ${perspective || "replacing weekly syncs with automated changelogs"}.\n\nTurnaround dropped from 5 days to 4 hours. Once the team experienced that speed, there was zero desire to go back.`;
    },
  },
  {
    name: "Data-First Receipt",
    reaction: "PRAISE",
    description: "Adds an odd-precision metric or real operational data to support the post.",
    whyThisFits: "Adds novel statistical proof that other commenters and the author will quote.",
    generate: (_snippet, perspective) => {
      return `The data backs this up. We saw an exact 41.8% drop in coordination overhead the moment we moved this outside email threads.\n\nMost teams underestimate how much margin leaks into 'alignment meetings' before a line of work even starts.`;
    },
  },
  {
    name: "Respectful Counter-Perspective",
    reaction: "INTEREST",
    description: "Politely challenges a specific assumption without being confrontational.",
    whyThisFits: "Thoughtful disagreement consistently triggers the longest author reply threads.",
    generate: (_snippet, perspective) => {
      return `Agree with the core premise, but with one key caveat: this works best when the underlying process is already mature.\n\nIf you automate a broken manual workflow, you just produce mistakes 10x faster. Getting the manual feedback loop right first is where the real work happens.`;
    },
  },
  {
    name: "Operational Specifics",
    reaction: "APPRECIATION",
    description: "Drills into the practical 'how' behind the high-level take.",
    whyThisFits: "Signals senior practitioner authority rather than surface-level generic commentary.",
    generate: (_snippet, perspective) => {
      return `The part people overlook is the tooling handoff. If you give operators 5 different tabs to check, context switching eats half their morning.\n\nUnifying notifications into a single dashboard was what actually made this sustainable for our team.`;
    },
  },
];

export function draftComments(postUrl: string, postText: string, userPerspective?: string): CommentDraft[] {
  const snippet = postText.slice(0, 300);

  return COMMENT_TEMPLATES.map((tmpl, idx) => {
    const rawContent = tmpl.generate(snippet, userPerspective);
    const humanized = humanizeLinkedInText(rawContent);

    return {
      id: `comment-draft-${idx + 1}-${Date.now()}`,
      postUrl,
      postSnippet: snippet,
      variant: idx + 1,
      content: humanized.humanized,
      templateName: tmpl.name,
      reaction: tmpl.reaction,
      whyThisFits: tmpl.whyThisFits,
      charCount: humanized.charCount,
    };
  });
}

export function draftReshareCommentary(postText: string, take?: string): string {
  const base = take || "This breaks down the exact operational shift happening across modern teams:";
  const draft = `${base}\n\nThe teams winning in 2026 aren't adding headcount to solve coordination.. they are building software workflows that compound throughput.`;
  return humanizeLinkedInText(draft).humanized;
}
