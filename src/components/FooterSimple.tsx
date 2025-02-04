import { Text} from '@mantine/core';
import classes from './FooterSimple.module.css';


export function FooterSimple() {
  

  return (
    <div className={classes.footer}>
      <Text size="sm" >
      © {new Date().getFullYear()} Cody L. Hall. All rights reserved.
      </Text>
    </div>
  );
}