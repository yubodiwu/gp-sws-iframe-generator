import React from 'react';
import { Button, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ReactMarkdown from 'react-markdown'

import styles from './IframeGenerator.module.scss';

const IframeGenerator = () => {
  const [src, setSrc] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(Date.now());
  const [iframe, setIframe] = React.useState('');

  return (
    <>
      <h1 className={styles.title}>GP Asia SWS iframe Generator</h1>
      <div className={styles.generatorForm}>
        <TextField required id="standard-basic" label="Cloudflare SRC" onChange={event => setSrc(event.target.value)} />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={date => setSelectedDate(date)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            value={selectedDate}
            onChange={date => setSelectedDate(date)}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </MuiPickersUtilsProvider>
        <Button
          className={styles.generate}
          color="primary"
          onClick={() => setIframe(`<iframe src="https://yubodiwu.github.io/gp-vjs-pages/?src=${src}&startTimestamp=${Math.floor(new Date(selectedDate).getTime() / 1000)}" width="100%" height="100%" frameborder="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>`)}
          variant="contained"
        >
          GENERATE IFRAME
        </Button>
      </div>
      {iframe && <ReactMarkdown className={styles.iframe} source={`\`\`\`${iframe}\`\`\``}/>}
    </>
  );
}

export default IframeGenerator;
