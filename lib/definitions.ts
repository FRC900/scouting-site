export type StandForm = {
  match: number;
  slot: string;
  username: string;
  preloaded: boolean;
  startingZone: boolean;
  autoL1: number;
  autoL2: number;
  autoL3: number;
  autoL4: number;
  teleopL1: number;
  teleopL2: number;
  teleopL3: number;
  teleopL4: number;
  teleopProcessor: number;
  teleopNet: number;
  fouls: number;
  techfouls: number;
  endgame: string;
  defence: string;
  status: string;
  notes: string;
};

export type StandFormDatabase = StandForm & {
  team: number;
  date: string;
};

export type PitForm = {
  team: number;
  drive: string;
  weight: number;
  preferredscoring: string;
  electrical: string;
  connection: "solder" | "crimp" | "pinch" | "tape" | "other"[];
  bumpers: string;
  reversible: boolean;
  bumpernotes: string;
  notes: string;
};

export type PitFormDatabase = PitForm & { date: string };

export type QualitativeForm = {
  match: number;
  alliance: "Red" | "Blue";
  t1notes: string;
  t1defence: string;
  t1defencenotes: string;
  t1status: string;
  t1hpnotes: string;
  t2notes: string;
  t2defence: string;
  t2defencenotes: string;
  t2status: string;
  t2hpnotes: string;
  t3notes: string;
  t3defence: string;
  t3defencenotes: string;
  t3status: string;
  t3hpnotes: string;
 }

export type User = {
  name: string;
  username: string;
  password: string;
  permissions: "member" | "lead" | "admin";
};

export type LoginForm = {
  email: string;
  password: string;
};

export type RegisterForm = {
  name: string;
  email: string;
  username: string;
  password: string;
  confirm: string;
};

type Overview = {
  team: number;
  name: string;
  rank: number;
  avePA: number;
};

export type Monstrosity = Overview & {
  insights: {
    aveAutoPA: number;
    aveTeleopPA: number;
    aveEndgamePA: number;
    aveCoral: number;
    aveAlgae: number;
    avePenalties: number;
    defence: number | string;
  };
  breakdown: {
    med: number;
    max: number;
    autoMed: number;
    autoMax: number;
    coralMax: number;
    algaeMax: number;
    tba_opr: number;
    sb_epa: number;
  };
  data: {
    preloaded: number;
    startingZone: number;
    auto: {
      l1: number;
      l2: number;
      l3: number;
      l4: number;
    };
    teleop: {
      l1: number;
      l2: number;
      l3: number;
      l4: number;
    };
    processor: number;
    net: number;
    climb: {
      nothing: number;
      parked: number;
      shallow: number;
      deep: number;
    };
  };
};

export type OnlyInsights = {
  aveAutoPA: number;
  aveTeleopPA: number;
  aveEndgamePA: number;
  aveCoral: number;
  aveAlgae: number;
  avePenalties: number;
  defence: number | string;
};

export type Insights = Overview & OnlyInsights;

export type OnlyBreakdown = {
  med: number;
  max: number;
  autoMed: number;
  autoMax: number;
  coralMax: number;
  algaeMax: number;
  tba_opr: number;
  sb_epa: number;
};

export type Breakdown = Overview & OnlyBreakdown;

export type OnlyData = {
  preloaded: number;
  startingZone: number;
  auto: {
    l1: number;
    l2: number;
    l3: number;
    l4: number;
  };
  teleop: {
    l1: number;
    l2: number;
    l3: number;
    l4: number;
  };
  processor: number;
  net: number;
  climb: {
    nothing: number;
    parked: number;
    shallow: number;
    deep: number;
  };
};

export type Data = Overview & OnlyData;

export type OnlySOS = {
  score: number;
  sb_composite: number;
};

export type SOS = Overview & OnlySOS;

export type Note = {
  note: string;
  user: string;
  status: number;
};

export type PitDataProps = {
  weight: number;
  drive: string;
  gamePiece: string;
  electrical: number;
  connection: ("solder" | "crimp" | "pinch" | "tape" | "other")[];
  bumpers: number;
  reversible: boolean;
  bumpernotes: string;
  note: string;
};

export type AreaChartData = {
  qual: string;
  slot: string;
  points: number;
}[];

export type ChartsData = {
  pa: AreaChartData;
  autoPA: AreaChartData;
  teleopPA: AreaChartData;
  endgamePA: AreaChartData;
  penaltyPA: AreaChartData;
  avePA: number;
  aveAutoPA: number;
  aveTeleopPA: number;
  aveEndgamePA: number;
  avePenaltyPA: number;
};

export type FullTeamData = {
  name: string;
  notes: Note[];
  pitform: PitDataProps;
} & ChartsData;

export type VerificationErrors = {
  key: string;
  teams: {
    number: number;
    form: string;
  }[];
  errors: {
    type: string;
    magnitude: number;
  }[];
};

export type TBATeamSimple = {
  key: string;
  team_number: number;
  nickname: string;
  name: string;
  city: string;
  state_prov: string;
  country: string;
};

export type TBAMatchSimple = {
  key: string;
  comp_level: string;
  set_number: number;
  match_number: number;
  alliances: {
    red: {
      score: number;
      team_keys: string[];
      surrogate_team_keys: string[];
      dq_team_keys: string[];
    };
    blue: {
      score: number;
      team_keys: string[];
      surrogate_team_keys: string[];
      dq_team_keys: string[];
    };
  };
  winning_alliance: ["red", "blue"];
  event_key: string;
  time: number;
  predicted_time: number;
  actual_time: number;
};

export type TBATeamEventStatus = {
  qual: {
    num_teams: number;
    ranking: {
      matches_played: number;
      qual_average: number;
      sort_orders: [number];
      record: {
        losses: number;
        wins: number;
        ties: number;
      };
      rank: number;
      dq: number;
      team_key: string;
    };
    sort_order_info: [
      {
        precision: number;
        name: string;
      }
    ];
    status: string;
  };
  alliance: {
    name: string;
    number: number;
    backup: {
      out: string;
      in: string;
    };
    pick: number;
  };
  playoff: {
    level: ["qm", "sf", "f"];
    current_level_record: {
      losses: number;
      wins: number;
      ties: number;
    };
    record: {
      losses: number;
      wins: number;
      ties: number;
    };
    status: string;
    playoff_average: number;
  };
  alliance_status_str: string;
  playoff_status_str: string;
  overall_status_str: string;
  next_match_key: string;
  last_match_key: string;
};

export type TBAEventOprs = {
  oprs: {
    [key: string]: number;
  };
  dprs: {};
  ccwms: {};
};

export type TBAEventMatch = {
  key: string;
  comp_level: "qm" | "sf" | "f";
  set_number: number;
  match_number: number;
  alliances: {
    red: {
      score: number;
      team_keys: string[];
      surrogate_team_keys: string[];
      dq_team_keys: string[];
    };
    blue: {
      score: number;
      team_keys: string[];
      surrogate_team_keys: string[];
      dq_team_keys: string[];
    };
  };
  winning_alliance: "red" | "blue";
  event_key: string;
  time: number;
  actual_time: number | null;
  predicted_time: number;
  post_result_time: number | null;
  score_breakdown: {
    blue: {
      adjustPoints: number;
      algaePoints: number;
      autoBonusAchieved: boolean;
      autoCoralCount: number;
      autoCoralPoints: number;
      autoLineRobot1: "Yes" | "No";
      autoLineRobot2: "Yes" | "No";
      autoLineRobot3: "Yes" | "No";
      autoMobilityPoints: number;
      autoPoints: number;
      autoReef: {
        botRow: {
          nodeA: boolean;
          nodeB: boolean;
          nodeC: boolean;
          nodeD: boolean;
          nodeE: boolean;
          nodeF: boolean;
          nodeG: boolean;
          nodeH: boolean;
          nodeI: boolean;
          nodeJ: boolean;
          nodeK: boolean;
          nodeL: boolean;
        };
        midRow: {
          nodeA: boolean;
          nodeB: boolean;
          nodeC: boolean;
          nodeD: boolean;
          nodeE: boolean;
          nodeF: boolean;
          nodeG: boolean;
          nodeH: boolean;
          nodeI: boolean;
          nodeJ: boolean;
          nodeK: boolean;
          nodeL: boolean;
        };
        tba_botRowCount: number;
        tba_midRowCount: number;
        tba_topRowCount: number;
        topRow: {
          nodeA: boolean;
          nodeB: boolean;
          nodeC: boolean;
          nodeD: boolean;
          nodeE: boolean;
          nodeF: boolean;
          nodeG: boolean;
          nodeH: boolean;
          nodeI: boolean;
          nodeJ: boolean;
          nodeK: boolean;
          nodeL: boolean;
        };
        trough: number;
      };
      bargeBonusAchieved: boolean;
      coopertitionCriteriaMet: boolean;
      coralBonusAchieved: boolean;
      endGameBargePoints: number;
      endGameRobot1: "Parked";
      endGameRobot2: "Parked";
      endGameRobot3: "None";
      foulCount: number;
      foulPoints: number;
      g206Penalty: boolean;
      g410Penalty: boolean;
      g418Penalty: boolean;
      g428Penalty: boolean;
      netAlgaeCount: number;
      rp: number;
      techFoulCount: number;
      teleopCoralCount: number;
      teleopCoralPoints: number;
      teleopPoints: number;
      teleopReef: {
        botRow: {
          nodeA: boolean;
          nodeB: boolean;
          nodeC: boolean;
          nodeD: boolean;
          nodeE: boolean;
          nodeF: boolean;
          nodeG: boolean;
          nodeH: boolean;
          nodeI: boolean;
          nodeJ: boolean;
          nodeK: boolean;
          nodeL: boolean;
        };
        midRow: {
          nodeA: boolean;
          nodeB: boolean;
          nodeC: boolean;
          nodeD: boolean;
          nodeE: boolean;
          nodeF: boolean;
          nodeG: boolean;
          nodeH: boolean;
          nodeI: boolean;
          nodeJ: boolean;
          nodeK: boolean;
          nodeL: boolean;
        };
        tba_botRowCount: number;
        tba_midRowCount: number;
        tba_topRowCount: number;
        topRow: {
          nodeA: boolean;
          nodeB: boolean;
          nodeC: boolean;
          nodeD: boolean;
          nodeE: boolean;
          nodeF: boolean;
          nodeG: boolean;
          nodeH: boolean;
          nodeI: boolean;
          nodeJ: boolean;
          nodeK: boolean;
          nodeL: boolean;
        };
        trough: number;
      };
      totalPoints: number;
      wallAlgaeCount: number;
    };
    red: {
      adjustPoints: number;
      algaePoints: number;
      autoBonusAchieved: boolean;
      autoCoralCount: number;
      autoCoralPoints: number;
      autoLineRobot1: "Yes" | "No";
      autoLineRobot2: "Yes" | "No";
      autoLineRobot3: "Yes" | "No";
      autoMobilityPoints: number;
      autoPoints: number;
      autoReef: {
        botRow: {
          nodeA: boolean;
          nodeB: boolean;
          nodeC: boolean;
          nodeD: boolean;
          nodeE: boolean;
          nodeF: boolean;
          nodeG: boolean;
          nodeH: boolean;
          nodeI: boolean;
          nodeJ: boolean;
          nodeK: boolean;
          nodeL: boolean;
        };
        midRow: {
          nodeA: boolean;
          nodeB: boolean;
          nodeC: boolean;
          nodeD: boolean;
          nodeE: boolean;
          nodeF: boolean;
          nodeG: boolean;
          nodeH: boolean;
          nodeI: boolean;
          nodeJ: boolean;
          nodeK: boolean;
          nodeL: boolean;
        };
        tba_botRowCount: number;
        tba_midRowCount: number;
        tba_topRowCount: number;
        topRow: {
          nodeA: boolean;
          nodeB: boolean;
          nodeC: boolean;
          nodeD: boolean;
          nodeE: boolean;
          nodeF: boolean;
          nodeG: boolean;
          nodeH: boolean;
          nodeI: boolean;
          nodeJ: boolean;
          nodeK: boolean;
          nodeL: boolean;
        };
        trough: number;
      };
      bargeBonusAchieved: boolean;
      coopertitionCriteriaMet: boolean;
      coralBonusAchieved: boolean;
      endGameBargePoints: number;
      endGameRobot1: "Parked";
      endGameRobot2: "Parked";
      endGameRobot3: "None";
      foulCount: number;
      foulPoints: number;
      g206Penalty: boolean;
      g410Penalty: boolean;
      g418Penalty: boolean;
      g428Penalty: boolean;
      netAlgaeCount: number;
      rp: number;
      techFoulCount: number;
      teleopCoralCount: number;
      teleopCoralPoints: number;
      teleopPoints: number;
      teleopReef: {
        botRow: {
          nodeA: boolean;
          nodeB: boolean;
          nodeC: boolean;
          nodeD: boolean;
          nodeE: boolean;
          nodeF: boolean;
          nodeG: boolean;
          nodeH: boolean;
          nodeI: boolean;
          nodeJ: boolean;
          nodeK: boolean;
          nodeL: boolean;
        };
        midRow: {
          nodeA: boolean;
          nodeB: boolean;
          nodeC: boolean;
          nodeD: boolean;
          nodeE: boolean;
          nodeF: boolean;
          nodeG: boolean;
          nodeH: boolean;
          nodeI: boolean;
          nodeJ: boolean;
          nodeK: boolean;
          nodeL: boolean;
        };
        tba_botRowCount: number;
        tba_midRowCount: number;
        tba_topRowCount: number;
        topRow: {
          nodeA: boolean;
          nodeB: boolean;
          nodeC: boolean;
          nodeD: boolean;
          nodeE: boolean;
          nodeF: boolean;
          nodeG: boolean;
          nodeH: boolean;
          nodeI: boolean;
          nodeJ: boolean;
          nodeK: boolean;
          nodeL: boolean;
        };
        trough: number;
      };
      totalPoints: number;
      wallAlgaeCount: number;
    };
    coopertition: string;
    coopertition_points: number;
  } | null;
  videos: [
    {
      type: string;
      key: string;
    }
  ];
};

// SQL Tables

// Stand Forms
// CREATE TABLE standforms (
//  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//  match varchar(255), slot varchar(255), team varchar(255),
//  username varchar(255),
//  preloaded varchar(255),
//  startingZone varchar(255),
//  autoL1 varchar(255),
//  autoL2 varchar(255),
//  autoL3 varchar(255),
//  autoL4 varchar(255),
//  teleopL1 varchar(255),
//  teleopL2 varchar(255),
//  teleopL3 varchar(255),
//  teleopL4 varchar(255),
//  teleopProcessor varchar(255),
//  teleopNet varchar(255),
//  endgame varchar(255),
//  defence varchar(255),
//  status varchar(255),
//  fouls varchar(255),
//  techfouls varchar(255),
//  notes varchar(255),
//  date varchar(255)
// );

// Pit Forms
// CREATE TABLE IF NOT EXISTS pitforms (
//   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//   team VARCHAR(255) NOT NULL,
//   drive VARCHAR(255) NOT NULL,
//   weight VARCHAR(255) NOT NULL,
//   preferredscoring VARCHAR(255) NOT NULL,
//   electrical VARCHAR(255) NOT NULL,
//   bumpers VARCHAR(255) NOT NULL,
//   notes VARCHAR(255) NOT NULL,
//   date VARCHAR(255) NOT NULL
// );

// User Table
// CREATE TABLE IF NOT EXISTS users (
//   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   email VARCHAR(255) NOT NULL UNIQUE,
//   password VARCHAR(255) NOT NULL,
//   permission VARCHAR(255) NOT NULL,
// );
