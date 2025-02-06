import { StandForm } from "./definitions";

export const parseStandFormNumbers = (data: StandForm) => {

    const match = parseInt(data.match);
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

    return ({
        ...data,
        match,
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
        fouls,
        techfouls
    })
}