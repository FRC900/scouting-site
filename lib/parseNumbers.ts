export const parseStandFormNumbers = (data: any) => {
    const match = parseInt(data.match);
    const team = parseInt(data.team);
    const preloaded = data.preloaded === "true";
    const startingZone = data.startingzone === "true";
    const autoL1 = parseInt(data.autol1);
    const autoL2 = parseInt(data.autol2);
    const autoL3 = parseInt(data.autol3);
    const autoL4 = parseInt(data.autol4);
    const teleopL1 = parseInt(data.teleopl1);
    const teleopL2 = parseInt(data.teleopl2);
    const teleopL3 = parseInt(data.teleopl3);
    const teleopL4 = parseInt(data.teleopl4);
    const teleopProcessor = parseInt(data.teleopprocessor);
    const teleopNet = parseInt(data.teleopnet);
    const fouls = parseInt(data.fouls);
    const techfouls = parseInt(data.techfouls);

    const id = data.id;
    const slot = data.slot;
    const username = data.username;
    const endgame = data.endgame;
    const defence = data.defence;
    const status = data.status;
    const notes = data.notes;
    const date = data.date;

    return ({
        id,
        match,
        slot,
        team,
        username,
        preloaded,
        startingZone,
        autoL1,
        autoL2,
        autoL3,
        autoL4,
        teleopL1,
        teleopL2,
        teleopL3,
        teleopL4,
        teleopProcessor,
        teleopNet,
        endgame,
        defence,
        status,
        fouls,
        techfouls,
        notes,
        date
    })
}

export const parsePitFormNumbers = (data: any) => {
    const team = parseInt(data.team);
    const weight = parseInt(data.weight);
    const electrical = parseInt(data.electrical);
    const bumpers = parseInt(data.bumpers);

    return ({
        ...data,
        team,
        weight,
        electrical,
        bumpers,
    })
}