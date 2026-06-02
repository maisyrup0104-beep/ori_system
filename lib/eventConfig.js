// Event type and subtype definitions
export const EVENT_TYPES = {
  OPERATIONAL: 'Operational Events',
  CONTENT_EVIDENCE: 'Content Evidence Events',
};

// Event subtypes organized by type
export const EVENT_SUBTYPES = {
  'Conversation': ['Owner', 'Manager', 'Prospect'],
  'Visit': ['Business Visit', 'Event Visit'],
  'Demo': ['Started', 'In Progress', 'Completed'],
  'Reply': ['Positive', 'Neutral', 'Negative', 'Interested'],
  'Learning': ['Pain Point', 'Objection', 'Insight', 'Idea'],
  'Outreach': ['Messages Sent', 'Follow-Up Sent', 'Call Scheduled'],
  'Lead': ['Added', 'Qualified'],
  'Client': ['Closed', 'Delivered', 'Testimonial'],
  'Revenue': ['Payment Received'],
  'Observation': ['Industry Observation', 'Competitor Observation', 'Pattern Noticed'],
  'Discovery': ['PMF Discovery', 'Market Discovery', 'Customer Insight'],
  'Validation': ['Positive Feedback', 'Business Mention', 'Interested Response', 'Proof Collected'],
  'Journey': ['Current Focus', 'Current Challenge', 'Current Win', 'Current Experiment'],
};

// All event type options (for dropdown)
export const ALL_EVENT_TYPES = [
  'Conversation',
  'Visit',
  'Demo',
  'Reply',
  'Learning',
  'Outreach',
  'Lead',
  'Client',
  'Revenue',
  'Observation',
  'Discovery',
  'Validation',
  'Journey',
];

// Segments
export const SEGMENTS = ['Med Spa', 'Beauty', 'Dental', 'General'];

// Visibility options
export const VISIBILITY_OPTIONS = ['Personal', 'Ori', 'Both', 'Internal'];

// Strength values based on event type and subtype
export const STRENGTH_MAP = {
  'Conversation': {
    'Owner': 20,
    'Manager': 20,
    'Prospect': 20,
  },
  'Visit': {
    'Business Visit': 30,
    'Event Visit': 30,
  },
  'Demo': {
    'Started': 20,
    'In Progress': 30,
    'Completed': 40,
  },
  'Reply': {
    'Positive': 50,
    'Neutral': 30,
    'Negative': 10,
    'Interested': 60,
  },
  'Learning': {
    'Pain Point': 20,
    'Objection': 25,
    'Insight': 30,
    'Idea': 35,
  },
  'Outreach': {
    'Messages Sent': 15,
    'Follow-Up Sent': 20,
    'Call Scheduled': 30,
  },
  'Lead': {
    'Added': 50,
    'Qualified': 70,
  },
  'Client': {
    'Closed': 100,
    'Delivered': 80,
    'Testimonial': 90,
  },
  'Revenue': {
    'Payment Received': 120,
  },
  'Observation': {
    'Industry Observation': 15,
    'Competitor Observation': 15,
    'Pattern Noticed': 20,
  },
  'Discovery': {
    'PMF Discovery': 25,
    'Market Discovery': 25,
    'Customer Insight': 30,
  },
  'Validation': {
    'Positive Feedback': 40,
    'Business Mention': 45,
    'Interested Response': 60,
    'Proof Collected': 40,
  },
  'Journey': {
    'Current Focus': 10,
    'Current Challenge': 10,
    'Current Win': 15,
    'Current Experiment': 12,
  },
};

// Calculate strength for an event type and subtype
export function calculateStrength(eventType, subtype) {
  if (!eventType || !subtype) return 0;
  return STRENGTH_MAP[eventType]?.[subtype] ?? 0;
}

// Get subtypes for a given event type
export function getSubtypesForType(eventType) {
  return EVENT_SUBTYPES[eventType] || [];
}
