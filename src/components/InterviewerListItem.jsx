import React from 'react';
import 'components/InterviewerListItem.scss';
import classNames from 'classnames';

export default function InterviewerListItem(props) {
  const interviewerClass = classNames('interviewers_item', {
    'interviewers_item--selected': props.selected,
  });
  return (
    <li
      className={interviewerClass}
      onClick={props.setInterviewer}
      selected={props.selected}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
