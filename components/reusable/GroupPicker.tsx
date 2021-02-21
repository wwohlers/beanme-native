import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import Group from "../../utils/models/Group";
import {StoreState} from "../../store/state";
import {Picker} from "react-native";

export default function GroupPicker(
  { onGroupSelected }:
    { onGroupSelected: (groupId: string) => void }
) {
  const groups = useSelector<StoreState, Group[]>(state => state.groups);

  useEffect(() => {
    onGroupSelected(groups[0]._id);
  }, [])

  return (
    <Picker
      selectedValue={groups[0]._id}
      onValueChange={onGroupSelected}>
      {
        groups.map(g => (
          <Picker.Item key={g._id} label={g.name} value={g._id} />
        ))
      }
    </Picker>
  )
}
