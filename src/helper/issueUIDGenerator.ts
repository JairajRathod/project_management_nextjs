function issueUIDGenerator(projectKey: string, issueNumber: number): string {
  return `${projectKey}-${issueNumber}`;
}

export default issueUIDGenerator;
