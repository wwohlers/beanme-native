import React from 'react';
import {Commitment} from "../../utils/models/Task";
import {ScrollView} from "react-native";
import SingleCommit from "./SingleCommit";
import {PopulatedGroup} from "../../utils/models/Group";
import Label from "../reusable/fonts/Label";

export default function CommitList({ commits, group }: { commits: Commitment[], group: PopulatedGroup }) {
  return (
    <ScrollView>
      { commits.map((c, i) => <SingleCommit commit={c} group={group} key={i} />)}
    </ScrollView>
  )
}
