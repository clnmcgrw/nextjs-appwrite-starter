import Link from 'next/link';
import { Text, Link as TextLink } from '@radix-ui/themes';
import style from '@/styles/modules/footer.module.css';

const AppFooter = ({}) => {
  return (
    <footer className={style.footer} role="contentInfo">
      <TextLink asChild weight="medium" size="2">
        <Link href="/">
          NextJS + Appwrite
        </Link>
      </TextLink>

      <Text size="1" color="gray" weight="medium">
        View on Github
      </Text>
    </footer>
  );
};

export default AppFooter;
