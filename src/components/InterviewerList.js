import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import '../components/InterviewerList.scss';

export default function InterviewerList(props) {
  const interviewerArray = props.interviewers.map((interviewer) => {
    console.log('INTERVIEWERLIST PROPS', props.value);
    return (
      <InterviewerListItem
        id={interviewer.id}
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={props.value == interviewer.id}
        setInterviewer={() => {
          props.setInterviewer(interviewer.id);
        }}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerArray}</ul>
    </section>
  );
}
