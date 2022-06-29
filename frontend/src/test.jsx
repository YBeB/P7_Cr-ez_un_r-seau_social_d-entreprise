<div
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div className="Register">
        <FormStyle onSubmit={handleSubmit}>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <label htmlFor="username">Identifiant</label>
          <InputStyle type="text" 
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e)=> setUser(e.target.value)}
          value={username}
          required
          aria-invalid={validName?"false":"true"}
          aria-describedby="uidnote"
          onFocus={()=>setUserFocus(true)}
          onBlur={()=>setUserFocus(false)}
          />
          <StyledParagraph id="uidnote" classname={userFocus && username && !validName ? "instructions":"offscreen"}>
            4 a 24 caracteres.<br/>
            l'identifiant dois commencé par une lettre<br/>
            Les lettres , nombres et tirets sont accéptés
          </StyledParagraph>
          <label htmlFor="">Email</label>
          <InputStyle type="email"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
            required
            aria-invalid={validEmail?"false":"true"}
            aria-describedby="uemailnote"
            onFocus={()=>setEmailFocus(true)}
            onBlur={()=>setEmailFocus(false)}
          />
          <StyledParagraph id="uemailnote" classname={emailFocus && email && !validEmail? "instructions":"offscreen"}>
            Entrer une adresse Mail Valide exemple =jeandupont@live.fr
          </StyledParagraph>
          <label htmlFor="">Mot de passe</label>
          <InputStyle type="password" 
          id="password" 
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          aria-invalid={validPassword ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          />

          <ButtonStyle type='submit'>Inscription</ButtonStyle>
        </FormStyle>
      </div>
    </div>
  );
}
export default Register;
