// Get the full source code, including the theme and Tailwind config:
// https://github.com/resend/react-email/tree/canary/apps/demo/emails

import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import tailwindConfig from '../tailwind.config';

interface WelcomeUserProps {
  username?: string;
}

export const WelcomeUser = ({
  username,
}: WelcomeUserProps) => (
  <Html>
    <Head />
    <Tailwind config={tailwindConfig}>
      <Body className="bg-white text-[#24292e] font-github">
        <Preview>
          A fine-grained personal access token has been added to your account
        </Preview>
        <Container className="max-w-[480px] mx-auto my-0 pt-5 pb-12 px-0">
          <Img
            src={`https://i.imgur.com/88vhZEf.png`}
            width="100"
            height="100"
            alt="Applause"
            className='mx-auto'
          />

          <Text className="text-[24px] leading-[1.25]">
            <strong>Welcome to Applause, @{username}</strong>, a personal access was created on your
            account.
          </Text>

          <Section className="p-6 border border-solid border-[#dedede] rounded-[5px] text-center">
            <Text className="mb-[10px] mt-0 text-left">
              Hey <strong>{username}</strong>!
            </Text>
            <Text className="mb-[10px] mt-0 text-left">
              A fine-grained personal access token (<Link>resend</Link>) was
              recently added to your account.
            </Text>

            <Button className="text-sm bg-[#28a745] text-white leading-normal rounded-lg py-3 px-6">
              View your token
            </Button>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

WelcomeUser.PreviewProps = {
  username: 'alanturing',
} as WelcomeUserProps;

export default WelcomeUser;
