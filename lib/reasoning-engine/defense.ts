/**
 * REMEM Defense Engine
 * Deterministic tradeoff reasoning and context inference
 */

import { Signal } from './signal-extraction';
import { CognitiveThread } from './thread-detection';
import { ProsecutorIssue } from './prosecutor';

export interface DefenseAnalysis {
  reasons: DefenseReason[];
  overallContext: 'Valid' | 'Questionable' | 'Invalid';
  confidence: number;
  tradeoffs: EngineeringTradeoff[];
  constraints: SystemConstraint[];
}

export interface DefenseReason {
  title: string;
  description: string;
  confidence: number;
  evidence: string[];
  category: DefenseCategory;
  ruleId: string;
}

export type DefenseCategory =
  | 'deployment_pressure'
  | 'hotfix_urgency'
  | 'legacy_constraints'
  | 'migration_complexity'
  | 'scaling_pressure'
  | 'demo_deadline'
  | 'compatibility_concern'
  | 'resource_limitation'
  | 'time_constraint'
  | 'technical_limitation';

export interface EngineeringTradeoff {
  tradeoff: string;
  chosen: string;
  sacrificed: string;
  justification: string;
  confidence: number;
}

export interface SystemConstraint {
  type: ConstraintType;
  description: string;
  impact: 'LOW' | 'MEDIUM' | 'HIGH';
  evidence: string[];
}

export type ConstraintType =
  | 'time'
  | 'resource'
  | 'technical'
  | 'business'
  | 'compatibility'
  | 'security';

export interface DefenseRule {
  id: string;
  name: string;
  category: DefenseCategory;
  condition: (context: DefenseContext) => boolean;
  generateReason: (context: DefenseContext) => DefenseReason;
}

export interface DefenseContext {
  signals: Signal[];
  threads: CognitiveThread[];
  prosecutorIssues: ProsecutorIssue[];
  text: string;
}

/**
 * Defense Rules - Deterministic tradeoff inference
 */
const DEFENSE_RULES: DefenseRule[] = [
  // Rule 1: Hotfix urgency
  {
    id: 'HOTFIX_URGENCY',
    name: 'Hotfix Urgency',
    category: 'hotfix_urgency',
    condition: (ctx) => {
      return /hotfix|urgent|critical.*bug|production.*down/gi.test(ctx.text);
    },
    generateReason: (ctx) => ({
      title: 'Hotfix Under Time Pressure',
      description: 'Rapid fix deployed under production pressure, prioritizing immediate stability over comprehensive testing.',
      confidence: 0.85,
      evidence: ctx.text.match(/hotfix|urgent|critical.*bug|production.*down/gi)?.slice(0, 3) || [],
      category: 'hotfix_urgency',
      ruleId: 'HOTFIX_URGENCY',
    }),
  },

  // Rule 2: Migration complexity
  {
    id: 'MIGRATION_COMPLEXITY',
    name: 'Migration Complexity',
    category: 'migration_complexity',
    condition: (ctx) => {
      return /migration|migrate|legacy|backward.*compat/gi.test(ctx.text);
    },
    generateReason: (ctx) => ({
      title: 'Complex Migration in Progress',
      description: 'System undergoing migration, requiring temporary workarounds and compatibility layers.',
      confidence: 0.8,
      evidence: ctx.text.match(/migration|migrate|legacy|backward.*compat/gi)?.slice(0, 3) || [],
      category: 'migration_complexity',
      ruleId: 'MIGRATION_COMPLEXITY',
    }),
  },

  // Rule 3: Demo deadline
  {
    id: 'DEMO_DEADLINE',
    name: 'Demo Deadline',
    category: 'demo_deadline',
    condition: (ctx) => {
      return /demo|presentation|showcase|deadline/gi.test(ctx.text);
    },
    generateReason: (ctx) => ({
      title: 'Demo Deadline Pressure',
      description: 'Feature development accelerated for demo or presentation, accepting technical debt for timely delivery.',
      confidence: 0.75,
      evidence: ctx.text.match(/demo|presentation|showcase|deadline/gi)?.slice(0, 3) || [],
      category: 'demo_deadline',
      ruleId: 'DEMO_DEADLINE',
    }),
  },

  // Rule 4: Scaling pressure
  {
    id: 'SCALING_PRESSURE',
    name: 'Scaling Pressure',
    category: 'scaling_pressure',
    condition: (ctx) => {
      return /scale|scaling|load|traffic|performance/gi.test(ctx.text) &&
             ctx.signals.some(s => s.type === 'urgency');
    },
    generateReason: (ctx) => ({
      title: 'Scaling Under Load',
      description: 'System experiencing scaling challenges, requiring quick optimizations that may introduce complexity.',
      confidence: 0.8,
      evidence: ctx.text.match(/scale|scaling|load|traffic|performance/gi)?.slice(0, 3) || [],
      category: 'scaling_pressure',
      ruleId: 'SCALING_PRESSURE',
    }),
  },

  // Rule 5: Legacy constraints
  {
    id: 'LEGACY_CONSTRAINTS',
    name: 'Legacy System Constraints',
    category: 'legacy_constraints',
    condition: (ctx) => {
      return /legacy|old.*code|deprecated|outdated/gi.test(ctx.text);
    },
    generateReason: (ctx) => ({
      title: 'Legacy System Constraints',
      description: 'Working within constraints of legacy codebase, limiting architectural options and requiring workarounds.',
      confidence: 0.85,
      evidence: ctx.text.match(/legacy|old.*code|deprecated|outdated/gi)?.slice(0, 3) || [],
      category: 'legacy_constraints',
      ruleId: 'LEGACY_CONSTRAINTS',
    }),
  },

  // Rule 6: Deployment pressure
  {
    id: 'DEPLOYMENT_PRESSURE',
    name: 'Deployment Pressure',
    category: 'deployment_pressure',
    condition: (ctx) => {
      const hasDeployment = ctx.signals.some(s => s.type === 'deployment_risk');
      const hasUrgency = ctx.signals.some(s => s.type === 'urgency');
      return hasDeployment && hasUrgency;
    },
    generateReason: (ctx) => ({
      title: 'Deployment Under Pressure',
      description: 'Deployment executed under time constraints, balancing speed with stability requirements.',
      confidence: 0.8,
      evidence: [
        ...ctx.signals.filter(s => s.type === 'deployment_risk').map(s => s.content),
        ...ctx.signals.filter(s => s.type === 'urgency').map(s => s.content),
      ].slice(0, 3),
      category: 'deployment_pressure',
      ruleId: 'DEPLOYMENT_PRESSURE',
    }),
  },

  // Rule 7: Compatibility concerns
  {
    id: 'COMPATIBILITY_CONCERNS',
    name: 'Compatibility Concerns',
    category: 'compatibility_concern',
    condition: (ctx) => {
      return /compat|backward|forward|version|breaking.*change/gi.test(ctx.text);
    },
    generateReason: (ctx) => ({
      title: 'Compatibility Requirements',
      description: 'Maintaining compatibility with existing systems, requiring careful version management and gradual rollout.',
      confidence: 0.75,
      evidence: ctx.text.match(/compat|backward|forward|version|breaking.*change/gi)?.slice(0, 3) || [],
      category: 'compatibility_concern',
      ruleId: 'COMPATIBILITY_CONCERNS',
    }),
  },

  // Rule 8: Resource limitations
  {
    id: 'RESOURCE_LIMITATIONS',
    name: 'Resource Limitations',
    category: 'resource_limitation',
    condition: (ctx) => {
      return /limited.*resource|constraint|budget|cost/gi.test(ctx.text);
    },
    generateReason: (ctx) => ({
      title: 'Resource Constraints',
      description: 'Operating under resource constraints, requiring pragmatic solutions within available budget and infrastructure.',
      confidence: 0.7,
      evidence: ctx.text.match(/limited.*resource|constraint|budget|cost/gi)?.slice(0, 3) || [],
      category: 'resource_limitation',
      ruleId: 'RESOURCE_LIMITATIONS',
    }),
  },

  // Rule 9: Technical debt paydown
  {
    id: 'TECHNICAL_DEBT_PAYDOWN',
    name: 'Technical Debt Paydown',
    category: 'technical_limitation',
    condition: (ctx) => {
      const hasRefactoring = /refactor|cleanup|technical.*debt/gi.test(ctx.text);
      const hasArchitecture = ctx.signals.some(s => s.type === 'architecture');
      return hasRefactoring && hasArchitecture;
    },
    generateReason: (ctx) => ({
      title: 'Technical Debt Paydown',
      description: 'Actively addressing technical debt, which may temporarily introduce instability during refactoring.',
      confidence: 0.75,
      evidence: ctx.text.match(/refactor|cleanup|technical.*debt/gi)?.slice(0, 3) || [],
      category: 'technical_limitation',
      ruleId: 'TECHNICAL_DEBT_PAYDOWN',
    }),
  },

  // Rule 10: Rollback safety
  {
    id: 'ROLLBACK_SAFETY',
    name: 'Rollback Safety Measures',
    category: 'deployment_pressure',
    condition: (ctx) => {
      return /rollback|revert|backup|canary|blue.*green/gi.test(ctx.text);
    },
    generateReason: (ctx) => ({
      title: 'Rollback Safety Implemented',
      description: 'Deployment includes rollback mechanisms, demonstrating risk awareness and mitigation planning.',
      confidence: 0.85,
      evidence: ctx.text.match(/rollback|revert|backup|canary|blue.*green/gi)?.slice(0, 3) || [],
      category: 'deployment_pressure',
      ruleId: 'ROLLBACK_SAFETY',
    }),
  },
];

/**
 * Run defense analysis
 */
export function runDefenseAnalysis(context: DefenseContext): DefenseAnalysis {
  const reasons: DefenseReason[] = [];

  // Apply all defense rules
  for (const rule of DEFENSE_RULES) {
    try {
      if (rule.condition(context)) {
        const reason = rule.generateReason(context);
        reasons.push(reason);
      }
    } catch (error) {
      console.error(`Error applying defense rule ${rule.id}:`, error);
    }
  }

  // Infer engineering tradeoffs
  const tradeoffs = inferTradeoffs(context, reasons);

  // Detect system constraints
  const constraints = detectConstraints(context);

  // Calculate overall context validity
  const overallContext = calculateOverallContext(reasons, context.prosecutorIssues);

  // Calculate confidence
  const confidence = reasons.length > 0
    ? reasons.reduce((sum, r) => sum + r.confidence, 0) / reasons.length
    : 0;

  return {
    reasons,
    overallContext,
    confidence,
    tradeoffs,
    constraints,
  };
}

/**
 * Infer engineering tradeoffs from context
 */
function inferTradeoffs(
  context: DefenseContext,
  reasons: DefenseReason[]
): EngineeringTradeoff[] {
  const tradeoffs: EngineeringTradeoff[] = [];

  // Tradeoff 1: Speed vs Stability
  const hasUrgency = reasons.some(r => 
    r.category === 'hotfix_urgency' || r.category === 'deployment_pressure'
  );
  const hasStabilityIssues = context.prosecutorIssues.some(i => 
    i.severity === 'HIGH' || i.severity === 'CRITICAL'
  );

  if (hasUrgency && hasStabilityIssues) {
    tradeoffs.push({
      tradeoff: 'Speed vs Stability',
      chosen: 'Speed',
      sacrificed: 'Comprehensive Testing',
      justification: 'Production urgency required rapid deployment, accepting increased risk for immediate fix.',
      confidence: 0.85,
    });
  }

  // Tradeoff 2: Compatibility vs Clean Architecture
  const hasCompatibility = reasons.some(r => r.category === 'compatibility_concern');
  const hasLegacy = reasons.some(r => r.category === 'legacy_constraints');

  if (hasCompatibility || hasLegacy) {
    tradeoffs.push({
      tradeoff: 'Compatibility vs Clean Architecture',
      chosen: 'Backward Compatibility',
      sacrificed: 'Architectural Purity',
      justification: 'Maintaining compatibility with existing systems required architectural compromises.',
      confidence: 0.8,
    });
  }

  // Tradeoff 3: Feature Delivery vs Technical Debt
  const hasDeadline = reasons.some(r => r.category === 'demo_deadline');
  const hasTechnicalDebt = context.prosecutorIssues.some(i => i.category === 'technical_debt');

  if (hasDeadline && hasTechnicalDebt) {
    tradeoffs.push({
      tradeoff: 'Feature Delivery vs Technical Debt',
      chosen: 'Feature Delivery',
      sacrificed: 'Code Quality',
      justification: 'Demo deadline prioritized feature completeness over code refinement.',
      confidence: 0.75,
    });
  }

  // Tradeoff 4: Scalability vs Simplicity
  const hasScaling = reasons.some(r => r.category === 'scaling_pressure');
  
  if (hasScaling) {
    tradeoffs.push({
      tradeoff: 'Scalability vs Simplicity',
      chosen: 'Scalability',
      sacrificed: 'Simplicity',
      justification: 'Scaling requirements introduced architectural complexity to handle increased load.',
      confidence: 0.8,
    });
  }

  return tradeoffs;
}

/**
 * Detect system constraints
 */
function detectConstraints(context: DefenseContext): SystemConstraint[] {
  const constraints: SystemConstraint[] = [];

  // Time constraints
  if (/deadline|urgent|asap|time.*pressure/gi.test(context.text)) {
    constraints.push({
      type: 'time',
      description: 'Operating under strict time constraints',
      impact: 'HIGH',
      evidence: context.text.match(/deadline|urgent|asap|time.*pressure/gi)?.slice(0, 3) || [],
    });
  }

  // Resource constraints
  if (/limited.*resource|budget|cost.*constraint/gi.test(context.text)) {
    constraints.push({
      type: 'resource',
      description: 'Limited computational or financial resources',
      impact: 'MEDIUM',
      evidence: context.text.match(/limited.*resource|budget|cost.*constraint/gi)?.slice(0, 3) || [],
    });
  }

  // Technical constraints
  if (/legacy|deprecated|old.*system|technical.*limitation/gi.test(context.text)) {
    constraints.push({
      type: 'technical',
      description: 'Technical limitations from legacy systems',
      impact: 'HIGH',
      evidence: context.text.match(/legacy|deprecated|old.*system|technical.*limitation/gi)?.slice(0, 3) || [],
    });
  }

  // Business constraints
  if (/business.*requirement|stakeholder|customer.*demand/gi.test(context.text)) {
    constraints.push({
      type: 'business',
      description: 'Business requirements driving technical decisions',
      impact: 'MEDIUM',
      evidence: context.text.match(/business.*requirement|stakeholder|customer.*demand/gi)?.slice(0, 3) || [],
    });
  }

  // Compatibility constraints
  if (/backward.*compat|breaking.*change|version.*lock/gi.test(context.text)) {
    constraints.push({
      type: 'compatibility',
      description: 'Compatibility requirements limiting options',
      impact: 'MEDIUM',
      evidence: context.text.match(/backward.*compat|breaking.*change|version.*lock/gi)?.slice(0, 3) || [],
    });
  }

  return constraints;
}

/**
 * Calculate overall context validity
 */
function calculateOverallContext(
  reasons: DefenseReason[],
  prosecutorIssues: ProsecutorIssue[]
): 'Valid' | 'Questionable' | 'Invalid' {
  if (reasons.length === 0) {
    return prosecutorIssues.length > 0 ? 'Invalid' : 'Questionable';
  }

  // Calculate defense strength
  const defenseStrength = reasons.reduce((sum, r) => sum + r.confidence, 0) / reasons.length;

  // Calculate prosecutor strength
  const prosecutorStrength = prosecutorIssues.length > 0
    ? prosecutorIssues.reduce((sum, i) => sum + i.confidence, 0) / prosecutorIssues.length
    : 0;

  // Compare strengths
  if (defenseStrength >= prosecutorStrength + 0.2) {
    return 'Valid';
  } else if (defenseStrength >= prosecutorStrength - 0.1) {
    return 'Questionable';
  } else {
    return 'Invalid';
  }
}

// Made with Bob