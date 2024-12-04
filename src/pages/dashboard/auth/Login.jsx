import { Logo } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox'; // Gunakan komponen ShadCN
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  return (
    <div className="bg-front-primary flex h-screen w-full items-center justify-center px-4">
      <form className="flex w-full flex-col gap-4 rounded-lg bg-white p-12 md:w-96">
        <Logo className="mx-auto mb-8" />
        <div className="flex items-center space-x-2">
          <Input placeholder="Email" />
        </div>

        <div className="flex items-center space-x-2">
          <Input placeholder="Password" />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label>Remember Me</Label>
        </div>

        <Button className="mt-4 w-full">Login</Button>
      </form>
    </div>
  );
};

export default Login;
