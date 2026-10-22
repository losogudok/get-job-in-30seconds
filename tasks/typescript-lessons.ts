interface LeaderboardEntry {
  id: number;
  name: string;
  score: number;
  createdAt: string;
  sample?: boolean;
}

type State = | { status: "loading" } | { status: "empty" } | { status: "error"; error: string } | { status: "success"; data: LeaderboardEntry[] };


// type State = {loading: boolean} | {error: string} | {data: LeaderboardEntry[]};
function getError(state: State): string {
  if (state.status === "error") {
    return state.error;
  }
  return "";
}

Array.isArray(entries);
const filteredEntries = entries.filter(e => 
    return (typeof e === 'object' && typeof e.name === 'string' && typeof e.score === 'number');
)

filteredEntries.length === entries.length;