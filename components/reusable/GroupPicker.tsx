import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import Group from "../../utils/models/Group";
import {StoreState} from "../../store/state";
import {Picker, View} from "react-native";
import Colors from "../../constants/Colors";

export default function GroupPicker(
  { onGroupSelected }:
    { onGroupSelected: (groupId: string) => void }
) {
  const groups = useSelector<StoreState, Group[]>(state => state.groups);

  useEffect(() => {
    onGroupSelected(groups[0].id);
  }, [])

  return (
    <View style={{ borderWidth: 1, borderColor: Colors.light.borders }}>
      <Picker
        itemStyle={{ fontFamily: 'DMSans_400Regular', color: Colors.light.theme }}
        selectedValue={groups[0].id}
        onValueChange={onGroupSelected}>
        {
          groups.map(g => (
            <Picker.Item key={g.id} label={g.groupName} value={g.id} />
          ))
        }
      </Picker>
    </View>
  )
}
