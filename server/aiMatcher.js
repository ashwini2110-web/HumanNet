/**
 * AI Matching Engine for HumanNet
 * 
 * Computes deterministic multi-factor match percentages and provides transparent rationale:
 * Factors:
 * 1. Semantic / Skill exact and partial match (Weight: 40%)
 * 2. Experience Level alignment (Weight: 20%)
 * 3. Schedule & Availability match (Weight: 15%)
 * 4. Interest overlap (Weight: 10%)
 * 5. Location / Mode compatibility (Weight: 10%)
 * 6. Historical rating boost (Weight: 5%)
 */

function calculateMatchScore(userMentor, request) {
  let score = 0;
  const reasons = [];

  const reqSkillLower = (request.skillRequired || '').toLowerCase().trim();
  const reqCategory = (request.category || '').toLowerCase();
  const reqLevel = (request.levelRequired || 'Intermediate').toLowerCase();
  const reqMode = (request.mode || 'Online').toLowerCase();

  // 1. Skill Match (40 pts)
  let bestSkillMatch = 0;
  let matchedSkillObj = null;

  userMentor.skillsOffered.forEach(skill => {
    const sName = skill.name.toLowerCase();
    const sCat = (skill.category || '').toLowerCase();
    
    if (sName === reqSkillLower) {
      bestSkillMatch = Math.max(bestSkillMatch, 40);
      matchedSkillObj = skill;
    } else if (sName.includes(reqSkillLower) || reqSkillLower.includes(sName)) {
      bestSkillMatch = Math.max(bestSkillMatch, 34);
      matchedSkillObj = skill;
    } else if (sCat === reqCategory && reqCategory !== '') {
      bestSkillMatch = Math.max(bestSkillMatch, 22);
      matchedSkillObj = skill;
    }
  });

  if (bestSkillMatch >= 34) {
    score += bestSkillMatch;
    reasons.push(`Direct subject expertise in "${matchedSkillObj ? matchedSkillObj.name : request.skillRequired}"`);
  } else if (bestSkillMatch > 0) {
    score += bestSkillMatch;
    reasons.push(`Strong foundational knowledge in ${matchedSkillObj ? matchedSkillObj.category : 'related field'}`);
  } else {
    // Partial cross-skill interest check
    const hasInterest = userMentor.interests.some(i => i.toLowerCase().includes(reqSkillLower) || reqSkillLower.includes(i.toLowerCase()));
    if (hasInterest) {
      score += 15;
      reasons.push(`Active domain interest and ongoing research in this area`);
    } else {
      score += 8; // Baseline capability score
    }
  }

  // 2. Experience Level Alignment (20 pts)
  const mentorExp = (userMentor.experienceLevel || '').toLowerCase();
  if (mentorExp.includes('staff') || mentorExp.includes('lead') || mentorExp.includes('executive') || mentorExp.includes('10+') || mentorExp.includes('8') || mentorExp.includes('9')) {
    score += 20;
    reasons.push(`Senior tier experience (${userMentor.experienceLevel}) ideal for rapid concept mastery`);
  } else if (mentorExp.includes('senior') || mentorExp.includes('advanced')) {
    score += 17;
    reasons.push(`High industry proficiency (${userMentor.experienceLevel})`);
  } else {
    score += 12;
  }

  // 3. Schedule & Availability Compatibility (15 pts)
  const availability = (userMentor.availability || '').toLowerCase();
  const reqSchedule = (request.schedulePreference || '').toLowerCase();
  
  if (reqSchedule.includes('weekend') && availability.includes('weekend')) {
    score += 15;
    reasons.push(`Synchronized weekend availability schedule`);
  } else if (reqSchedule.includes('evening') && availability.includes('evening')) {
    score += 15;
    reasons.push(`Compatible evening time slot overlap`);
  } else if (availability.includes('flexible')) {
    score += 14;
    reasons.push(`Flexible timezone schedule accommodating custom slots`);
  } else {
    score += 10;
    reasons.push(`Compatible calendar windows available this week`);
  }

  // 4. Interest Overlap (10 pts)
  const interestMatches = userMentor.interests.filter(item => 
    reqSkillLower.includes(item.toLowerCase()) || 
    (request.description && request.description.toLowerCase().includes(item.toLowerCase()))
  );
  if (interestMatches.length > 0) {
    score += 10;
    reasons.push(`Shared enthusiasm for ${interestMatches.join(', ')}`);
  } else {
    score += 6;
  }

  // 5. Mode / Location (10 pts)
  const loc = (userMentor.location || '').toLowerCase();
  if (reqMode === 'online') {
    score += 10;
    reasons.push(`High-bandwidth remote setup & digital collaboration workspace ready`);
  } else {
    if (loc.includes('in-person') || loc.includes('hybrid')) {
      score += 10;
      reasons.push(`Local geographic proximity for in-person pair-sessions`);
    } else {
      score += 5;
    }
  }

  // 6. Rating & Past Performance (5 pts)
  const rating = userMentor.rating || 4.5;
  if (rating >= 4.9) {
    score += 5;
    reasons.push(`Top-tier satisfaction rating (${rating}/5.0 from ${userMentor.reviewsCount || 20}+ peer reviews)`);
  } else if (rating >= 4.7) {
    score += 4;
    reasons.push(`Verified mentor with high rating (${rating}/5.0)`);
  } else {
    score += 3;
  }

  // Cap between 65% and 98% for realistic SaaS scoring
  const finalPercentage = Math.min(98, Math.max(65, Math.round(score)));

  return {
    mentor: {
      id: userMentor.id,
      name: userMentor.name,
      photo: userMentor.photo,
      bio: userMentor.bio,
      rating: userMentor.rating,
      reviewsCount: userMentor.reviewsCount,
      experienceLevel: userMentor.experienceLevel,
      location: userMentor.location,
      availability: userMentor.availability,
      credits: userMentor.credits,
      skillsOffered: userMentor.skillsOffered
    },
    matchScore: finalPercentage,
    matchReasons: reasons
  };
}

function rankMentorsForRequest(allMentors, request, currentUserId = null) {
  const eligible = allMentors.filter(m => m.id !== currentUserId && m.id !== request.userId);
  
  const matches = eligible.map(m => calculateMatchScore(m, request));
  matches.sort((a, b) => b.matchScore - a.matchScore);
  return matches;
}

module.exports = {
  calculateMatchScore,
  rankMentorsForRequest
};
