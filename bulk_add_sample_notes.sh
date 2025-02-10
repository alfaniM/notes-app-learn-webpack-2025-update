#!/bin/bash
API_URL="https://notes-api.dicoding.dev/v2/notes"

declare -a notes=(
  "Update Resume|Optimize resume with latest projects and skills"
  "Apply for Jobs|Submit applications to at least 5 companies per day"
  "Improve Portfolio|Add new projects and case studies to showcase skills"
  "Study JavaScript|Deep dive into ES6+ and best practices"
  "Practice Coding|Solve frontend challenges on LeetCode and CodeWars"
  "Build Mini Projects|Create 3 small projects using React, Vue, or Svelte"
  "Mock Interviews|Practice answering frontend-related interview questions"
  "Learn TypeScript|Understand TypeScript for scalable frontend apps"
  "Explore Web Performance|Improve page load speed using Lighthouse and Web Vitals"
  "Study CSS Animations|Use GSAP and CSS animations for better UI/UX"
  "Build Personal Blog|Share frontend insights and projects"
  "Contribute to Open Source|Join GitHub projects and contribute to community"
  "Master Git & GitHub|Improve version control and collaboration skills"
  "Understand Accessibility|Ensure websites follow WCAG guidelines"
  "Learn Backend Basics|Understand API development and database management"
  "Master React Hooks|Use useState, useEffect, and custom hooks efficiently"
  "Optimize Frontend Performance|Reduce bundle size and improve lazy loading"
  "Network with Developers|Join meetups and LinkedIn groups"
  "Learn Next.js|Improve SSR and SEO for React apps"
  "Write Clean Code|Follow best practices in JavaScript and React"
)

for note in "${notes[@]}"; do
  IFS="|" read -r title body <<< "$note"
  curl -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d "{\"title\": \"$title\", \"body\": \"$body\"}"
  echo "Added: $title"
done
