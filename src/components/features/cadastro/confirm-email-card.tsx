import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // Importe o Link do Next.js

interface ConfirmEmailCardProps {
  email: string;
}

export function ConfirmEmailCard({ email }: ConfirmEmailCardProps) {
  return (
    <Card className="w-full max-w-sm shadow-lg border border-gray-200 bg-white lg:bg-transparent">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-gray-800">Confirme seu e-mail</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-center">
          Enviamos um e-mail para <strong>{email}</strong>. Verifique sua caixa de entrada e siga as instruções para ativar sua conta.
        </p>
        <div className="mt-4 flex justify-center">
          <Link href="/login" passHref>
            <Button className="bg-gray-800 text-white hover:bg-gray-900">
              Voltar ao início
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
