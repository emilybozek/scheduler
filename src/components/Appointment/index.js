import React from 'react';
import '../Appointment/style.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from './useVisualMode';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment(props) {
  console.log('INDEX PROPS', props);
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';
  const CONFIRM = 'CONFIRM';
  const DELETING = 'DELETING';
  const EDIT = 'EDIT';
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        transition(ERROR_SAVE, true);
      });
  };

  const editInterview = () => {
    transition(EDIT);
  };

  const deleteInterview = () => {
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={editInterview}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status status={'SAVING'} />}
      {mode === DELETING && <Status status={'DELETING'} />}
      {mode === CONFIRM && (
        <Confirm
          message={`Are you sure you want to delete this booking with ${props.interview.interviewer.name}?`}
          onConfirm={deleteInterview}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
      )}
      {mode === ERROR_SAVE && <Error message={'cannot save'} onClose={back} />}
      {mode === ERROR_DELETE && (
        <Error message={'cannot delete'} onClose={back} />
      )}
    </article>
  );
}
